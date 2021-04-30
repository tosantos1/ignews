import {useSession, signIn} from 'next-auth/client'
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}
// credencias secretas
// getServerSideProps (SSR)
// getStaticProps (SSG)
// API routes 

export function SubscribeButton({priceId}: SubscribeButtonProps) {
    const [session] = useSession();  // analisar se está logado

    function handleSubscribe() {
        if(!session){ //se não existir uma sessao de usuario vou transferir ele para o signin
            signIn('github')
            return;
        }
        // criação da checkout session
        
    }

    return (
        <button
            type="button"
            className = {styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    );
}