import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { openModalFlow } from './openModalFlow.ts';

const createStack = () => {
    const activeKeys = new Set();
    const elements = new Map();

    return {
        activeKeys,
        elements,
        operations: {
            reserve(key) {
                if (activeKeys.has(key)) return false;
                activeKeys.add(key);
                return true;
            },
            append(key, element) {
                elements.set(key, element);
            },
            remove(key) {
                activeKeys.delete(key);
                elements.delete(key);
            },
        },
    };
};

describe('openModalFlow', () => {
    it('removes the modal before resolving its promise', async () => {
        const stack = createStack();
        let resolveModal;

        const result = openModalFlow('example', (resolve) => {
            resolveModal = resolve;
            return 'example modal';
        }, stack.operations);

        assert.equal(stack.elements.get('example'), 'example modal');
        resolveModal('done');

        assert.equal(await result, 'done');
        assert.equal(stack.activeKeys.has('example'), false);
        assert.equal(stack.elements.has('example'), false);
    });

    it('rejects a duplicate key without rendering or replacing the active modal', async () => {
        const stack = createStack();
        stack.activeKeys.add('shared');
        stack.elements.set('shared', 'original modal');
        let renderCalled = false;

        const duplicate = openModalFlow('shared', () => {
            renderCalled = true;
            return 'duplicate modal';
        }, stack.operations);

        await assert.rejects(duplicate, /A modal with the key "shared" is already open\./);
        assert.equal(renderCalled, false);
        assert.equal(stack.elements.get('shared'), 'original modal');
    });

    it('does not append a modal that resolves synchronously', async () => {
        const stack = createStack();

        const result = openModalFlow('sync', (resolve) => {
            resolve('done');
            return 'stale modal';
        }, stack.operations);

        assert.equal(await result, 'done');
        assert.equal(stack.activeKeys.has('sync'), false);
        assert.equal(stack.elements.has('sync'), false);
    });

    it('ignores stale callbacks after a flow has settled', async () => {
        const stack = createStack();
        let resolveFirst;
        let rejectFirst;
        let resolveSecond;

        const first = openModalFlow('reused', (resolve, reject) => {
            resolveFirst = resolve;
            rejectFirst = reject;
            return 'first modal';
        }, stack.operations);

        resolveFirst('first');
        assert.equal(await first, 'first');

        const second = openModalFlow('reused', (resolve) => {
            resolveSecond = resolve;
            return 'second modal';
        }, stack.operations);

        rejectFirst(new Error('late rejection'));
        assert.equal(stack.elements.get('reused'), 'second modal');

        resolveSecond('second');
        assert.equal(await second, 'second');
    });

    it('releases the key when rendering throws', async () => {
        const stack = createStack();
        const renderError = new Error('render failed');

        await assert.rejects(
            openModalFlow('retryable', () => {
                throw renderError;
            }, stack.operations),
            renderError,
        );

        assert.equal(stack.activeKeys.has('retryable'), false);

        let resolveRetry;
        const retry = openModalFlow('retryable', (resolve) => {
            resolveRetry = resolve;
            return 'retry modal';
        }, stack.operations);

        assert.equal(stack.elements.get('retryable'), 'retry modal');
        resolveRetry('done');
        assert.equal(await retry, 'done');
    });
});
