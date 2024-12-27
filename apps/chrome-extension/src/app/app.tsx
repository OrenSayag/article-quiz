import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@article-quiz/components';
import { ThemeProvider } from '../components/theme-provider';

export function App() {
  // const onOpenQuiz = () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     chrome.scripting.executeScript({
  //       target: { tabId: tabs[0].id! },
  //       func: () => {
  //         const el = renderToString(<TestButton />);
  //         document.appendChild(el);
  //       },
  //     });
  //   });
  // };
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className={'h-96 w-96 p-12'}>
        <Button>Open Modal</Button>
        <TestDialog />
      </div>
    </ThemeProvider>
  );
}

export default App;

function TestDialog() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
