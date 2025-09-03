import { redirect } from 'next/navigation';
import config from '@/config';

export default function RootPage() {
  redirect(`/${config.i18n.defaultLocale}`);
} 