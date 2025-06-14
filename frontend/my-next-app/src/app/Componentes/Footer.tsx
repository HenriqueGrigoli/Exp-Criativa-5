'use client';

import '../../i18n';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-blue-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-blue-700 pb-2">
              {t('footer.institutional')}
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/SobreIris" text={t('footer.links.about')} />
              <FooterLink href="/FAQ" text={t('footer.links.faq')} />
              <FooterLink href="/PoliticaPrivacidade" text={t('footer.links.privacyPolicy')} />
              <FooterLink href="/termodeuso" text={t('footer.links.terms')} />
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 border-b border-blue-700 pb-2">
              {t('footer.helpIris')}
            </h3>
            <ul className="space-y-3">
              <FooterLink href="/Doacoes" text={t('footer.links.donations')} />
              <FooterLink href="/Cadastro" text={t('footer.links.volunteering')} />
            </ul>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">{t('footer.contactTitle')}</h4>
              <p className="flex items-center">
                <EnvelopeIcon className="mr-2 h-5 w-5" />
                contato@iris.org.br
              </p>
              <p className="flex items-center mt-2">
                <PhoneIcon className="mr-2 h-5 w-5" />
                (11) 1234-5678
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 pt-8">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link href="/">
                <div className="relative h-12 w-32">
                  <Image
                    src="/logo_iris_somente_logo.png"
                    alt="IRIS Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </div>
              </Link>
              <p className="text-sm mt-2 md:mt-0 text-center md:text-left">
                © {new Date().getFullYear()} IRIS — {t('footer.rights')}
              </p>
            </div>

            <div className="flex space-x-4">
              <SocialIcon href="https://facebook.com" icon="facebook" />
              <SocialIcon href="https://twitter.com" icon="twitter" />
              <SocialIcon href="https://instagram.com" icon="instagram" />
              <SocialIcon href="https://youtube.com" icon="youtube" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  text: string;
  small?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, text, small = false }) => (
  <li>
    <Link
      href={href}
      className={`hover:text-blue-200 transition ${small ? 'text-xs' : ''}`}
    >
      {text}
    </Link>
  </li>
);

interface SocialIconProps {
  href: string;
  icon: 'facebook' | 'twitter' | 'instagram' | 'youtube';
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, icon }) => {
  const icons = {
    facebook:
      'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    twitter:
      'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z',
    instagram:
      'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
    youtube:
      'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
  };

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d={icons[icon]} />
      </svg>
    </a>
  );
};

const EnvelopeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default Footer;
