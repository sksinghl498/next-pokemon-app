import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export async function getServerSideProps({params}){
    const resp= await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`);

    return {
        props: {
            pokemon: await resp.json(),
        }
    }
}

export default function Details({pokemon}){
    
    return( <div>
        <Head>
            <title>{pokemon.name}</title>
        </Head>
        <div>
            <Link href="/">
                <a >Back to Home</a>
            </Link>
        </div>

        <div className={styles.layout}>
            <div>
                <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name.english} />
            </div>

            <div>
                <div className={styles.name}>{pokemon.name}</div>
                <div className={styles.type}>{pokemon.type.join(", ")}</div>


                <table>
                    <thead className={styles.header}>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                </table>

                <tbody>
                    {
                        pokemon.stats.map(({name,value})=>(
                            <tr key={name}>
                                <td className ={styles.attribute}>{name}</td>
                                <td>{value}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </div>


        </div>
    </div>)
}
