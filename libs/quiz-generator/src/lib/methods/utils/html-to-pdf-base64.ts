import { generatePdf } from 'html-pdf-node';

type Input = {
  html: string;
};

type Output = string;

export const htmlToPdfBase64 = async ({ html }: Input): Promise<Output> => {
  const file = { content: html };

  const pdfBuffer = await generatePdf(file, { format: 'A4' });

  const base64 = pdfBuffer.toString('base64');

  return base64;
};
