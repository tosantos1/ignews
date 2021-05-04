import {useSession, signIn} from 'next-auth/client'
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}
// credencias secretas
// getServerSideProps (SSR)
// getStaticProps (SSG)
// API routes 

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();  // analisar se está logado

    async function handleSubscribe() {
        if(!session) { 
            //se não existir uma sessao de usuario vou transferir ele para o signin
            signIn('github')
            return;
        }
        // criação da checkout session

        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({sessionId})
        } catch (err) {
            alert(err.message);
        }
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