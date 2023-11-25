import Link from 'next/link';
import React from 'react';

export default function Home() {
	return (
		<div>
			<h1>Custom React hooks</h1>
			<ul>
				<li>
					<Link href='/hook-use-handler-request'>Hook use-handler-request</Link>
				</li>
				<li>
					<Link href='/hook-use-local-storage'>Hook use-local-storage</Link>
				</li>
				<li>
					<Link href='/hook-use-previous'>Hook use-previous</Link>
				</li>
			</ul>
		</div>
	);
}
