import { FC } from 'react';
import { Dialog, DialogContent } from '@article-quiz/components';

interface Props {
  onClose(): void;
}

export const LoginFromExtensionSuccessfulModal: FC<Props> = ({ onClose }) => {
  return (
    <>
      <Dialog
        open={true}
        onOpenChange={(val) => {
          if (!val) {
            onClose();
          }
        }}
      >
        <DialogContent
          className={
            'flex items-center justify-center flex-col gap-3 text-center'
          }
        >
          <h3 className={'font-semibold text-2xl'}>Successfully logged in!</h3>
          <p>
            You can return to the web page and use the extension now to get
            quizzes.
          </p>
          <p>
            This is the dashboard. You can see your quizzes progress and more
            here.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};
