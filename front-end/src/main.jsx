import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider.jsx';
import { Buffer } from 'buffer';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AuthProvider>
			<Theme appearance='dark'>
				<App />
			</Theme>
		</AuthProvider>
	</StrictMode>
);

window.Buffer = Buffer;