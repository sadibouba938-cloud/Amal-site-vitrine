import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AMAL Savonnerie & Détergents | Industrie, Laboratoire R&D & Showroom 3D',
  description:
    'Site vitrine officiel 3D d’AMAL Savonnerie & Détergents : fabrication industrielle de lessives, liquides vaisselle, dégraissants professionnels, désinfectants et savons traditionnels 72%. Configurateur 3D Marque Blanche et Devis B2B.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-[#040B14] text-slate-100 antialiased selection:bg-cyan-400 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
