
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Link from 'next/link';

export async function getServerSideProps(){
  const resp= await fetch('https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json');
   
  return {
    props:{
      pokemon: await resp.json(),
    }
  }
}


export default function Home({pokemon}) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon App</title>
      </Head>
      
      <div className={styles.grid}>
        {
          pokemon.map((pokemon)=>(
            <div className={styles.card} key={pokemon.id}>
              <Link href={`/pokemon/${pokemon.id}`}>
                <a>
                  <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} />
                  <h5>{pokemon.name}</h5>
                </a>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}
