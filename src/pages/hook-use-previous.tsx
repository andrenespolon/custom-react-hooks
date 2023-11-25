import React from 'react';

import Link from 'next/link';

import usePrevious from '@hooks/use-previous';

const EMAIL_FROM_API = 'papilon@email.com';

const wait = (time: number) =>
	new Promise(resolve => setTimeout(resolve, time));

/**
 * Sample Email Form Props
 */
type SampleEmailFormProps = {
	isLoading?: boolean;
	defaulValue: string;
};

/**
 * Sample Email Form
 */
function SampleEmailForm({ defaulValue, isLoading }: SampleEmailFormProps) {
	const prevEmail = usePrevious(defaulValue);
	const [email, setEmail] = React.useState<string>(defaulValue);

	/**
	 * Handle change
	 */
	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setEmail(value);
	};

	if (isLoading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<div>
				<code>
					prevEmail: <strong>{prevEmail}</strong>
				</code>
			</div>
			<code>
				email: <strong>{email}</strong>
			</code>
			<p>Type a diferent email to submit.</p>
			<div>
				<input type='email' value={email} onChange={handleEmail} />
				<button disabled={email === prevEmail || !email}>Submit</button>
			</div>
		</div>
	);
}

/**
 * Page
 */
export default function HookUsePrevious() {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);

	React.useEffect(() => {
		async function fetchEmail() {
			await wait(2000);
			setIsLoading(false);
		}
		fetchEmail();
	}, []);

	return (
		<div>
			<Link href='/'>Go back</Link>
			<h2>Hook use-previous</h2>
			<p>
				Suposing the email come from API, there is no action if the user input
				the same email. So button still disabled if email === prevEmail.
			</p>
			<SampleEmailForm defaulValue={EMAIL_FROM_API} isLoading={isLoading} />
		</div>
	);
}
