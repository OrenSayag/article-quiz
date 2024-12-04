export function markButtonError(button: HTMLButtonElement, error: unknown) {
  console.error('Failed to fetch quiz data:', error);

  // Update the button to indicate the error
  button.disabled = true;
  button.style.backgroundColor = 'red';
  button.textContent = 'Error loading quiz';
}
