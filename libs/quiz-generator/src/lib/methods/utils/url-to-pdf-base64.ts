import mdToPdf from 'md-to-pdf';

type Input = {
  url: string;
};

type Output = string;

export const urlToPdfBase64 = async ({ url }: Input): Promise<Output> => {
  const res = await fetch(`https://r.jina.ai/${url}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch content: ${res.statusText}`);
  }

  const markdown = await res.text();

  const pdf = await mdToPdf({ content: markdown });

  if (!pdf || !pdf.content) {
    throw new Error('Failed to generate PDF');
  }

  const base64 = Buffer.from(pdf.content).toString('base64');
  return base64;
};
