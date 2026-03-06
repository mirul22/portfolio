import clsx from 'clsx';
import { Container, Logo } from 'components';
import { useActionLog } from 'components/ActionLog/context';
import { useOnClickOutside } from 'lib';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { FC, Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';
import useSound from 'use-sound';

import { useHeaderVisible } from './libs/useHeaderVisible';

enum Themes {
  light = 'light',
  dark = 'dark',
}

enum Languages {
  en = 'en',
}

const languages = [
  {
    id: Languages.en,
    name: 'EN',
    flag: '🇨🇦',
  },
];

interface HeaderProps {
  embedded?: boolean;
}

export const Header: FC<HeaderProps> = ({ embedded = false }) => {
  const { addLog } = useActionLog();
  const [playOnDark] = useSound('/sounds/dark-on.mp3');
  const [playOnLight] = useSound('/sounds/light-on.mp3');
  const visible = useHeaderVisible();
  const ref = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [langPicker, setLangPicker] = useState(false);

  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [language, setLanguage] = useState<string>(router.locale || Languages.en);

  const toggleTheme = useCallback(() => {
    if (theme === Themes.light) {
      playOnLight();
    } else {
      playOnDark();
    }
    addLog(`Theme: switched to ${theme === Themes.light ? 'dark' : 'light'} mode`, 'action');
    setTheme(theme === Themes.light ? Themes.dark : Themes.light);
  }, [addLog, setTheme, theme, playOnDark, playOnLight]);

  const toggleLangPicker = useCallback(() => {
    setLangPicker((prev) => !prev);
  }, []);

  const turnOffLangPicker = useCallback(() => {
    setLangPicker(false);
  }, []);

  useOnClickOutside(ref, turnOffLangPicker);

  const toggleLanguage = useCallback(
    (newLanguage: Languages) => {
      return () => {
        turnOffLangPicker();
        setLanguage(newLanguage);
        if (newLanguage !== language) router.push('/', '/', { locale: newLanguage });
      };
    },
    [router, turnOffLangPicker, language]
  );

  useEffect(() => setMounted(true), []);

  return (
    <div
      className={clsx(
        'w-full transition-top duration-300',
        embedded
          ? 'relative border-b border-gray-200 bg-gray-100 py-2 dark:border-cursor-border dark:bg-cursor-sidebar'
          : clsx('fixed z-20 opacity-90 bg-lightTheme dark:bg-darkTheme', visible ? 'top-0' : '-top-28')
      )}
    >
      <Container
        className={clsx(
          'flex w-auto items-center justify-between text-gray-900 dark:text-white-900',
          embedded ? 'gap-2 py-2 px-3 sm:px-4' : 'py-5 px-4 md:py-9 md:px-6'
        )}
      >
        <Link href="/">
          <a href="/">
            <Logo />
          </a>
        </Link>
        <div className="flex items-center">
          <button
            className="items-center justify-center w-12 h-12 rounded-md dark:bg-gray-900 bg-pink focus:outline-none focus:ring-2 ring-blue-700 d-flex"
            onClick={toggleTheme}
          >
            {mounted ? (
              theme === Themes.light ? (
                <HiMoon className="inline w-6 h-6 ml-1" />
              ) : (
                <HiSun className="inline w-6 h-6" />
              )
            ) : null}
          </button>
          <div className="relative ml-2 md:ml-4" ref={ref}>
            <button
              className="py-2 pl-4 text-base font-medium uppercase rounded appearance-none pr-9 focus:outline-none focus:ring-2 focus:ring-blue-700 bg-none"
              onClick={toggleLangPicker}
            >
              {language}
            </button>
            {langPicker && (
              <div className="absolute w-full p-1 mt-4 bg-pink dark:bg-white-900 rounded-md text-black-900">
                {languages.map((currentLanguage, i) => (
                  <Fragment key={currentLanguage.name}>
                    <button
                      className="block w-full px-2 py-1 text-left hover:bg-white-700 rounded-md transition-colors focus:outline-none"
                      key={currentLanguage.id}
                      onClick={toggleLanguage(currentLanguage.id)}
                    >
                      <p className={clsx('inline')}>{currentLanguage.name} </p>
                      <span role="img" aria-label="flag">
                        {currentLanguage.flag}
                      </span>
                    </button>
                    {i !== languages.length - 1 && <div className="my-1 bg-white-700 h-0.5" />}
                  </Fragment>
                ))}
              </div>
            )}
            <span className="absolute top-0 right-0 flex items-center justify-center w-10 h-full text-center pointer-events-none">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};
