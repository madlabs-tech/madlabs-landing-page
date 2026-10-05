/** Open state of the "Book a call" dialog, shared by every CTA on the page. */
export const contact = $state({ open: false });

/**
 * Click handler for "Book a call" links. The links keep their mailto: href,
 * so without JavaScript they still open an email; with it, the dialog opens.
 */
export function openContact(e: MouseEvent) {
	e.preventDefault();
	contact.open = true;
}
