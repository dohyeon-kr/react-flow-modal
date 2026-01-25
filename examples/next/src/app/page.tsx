'use client';

import Image from "next/image";
import { useModal } from "react-flow-modal";
import { motion } from "motion/react";

export default function Home() {
  const modal = useModal();

  const onClickStart = async () => {

    await modal.open("start", (resolve) => {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 grid place-items-center" onClick={(e) => {
            if (e.target === e.currentTarget) {
              resolve(false);
            }
          }}>
          <div className="nes-container is-dark is-centered">
            <h2 className="text-2xl font-bold is-warning nes-text"><i className="hn hn-exclamation-triangle"></i>네트워크 안내</h2>
            <p>현재 <strong className="text-neon-500">인터갤럭시넷™</strong>에 연결되어 있지 않습니다.</p>
            <p><strong className="text-neon-500">인터갤럭시넷™</strong> 인프라 구축이 진행중이며,</p>
            <p>완료전까지 제출된 보고서는 <strong>표본 디바이스</strong>에 임시 저장됩니다.</p>
            <p>연결이 복구되면 보고서 동기화 절차를 진행할 수 있습니다.</p>
            <button type="button" className="nes-btn" onClick={() => resolve(true)}>확인</button>
          </div>
        </motion.div>
      );
    });

  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            onClick={onClickStart}
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
