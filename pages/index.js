import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import mainImage from '@/public/images/sad_meme.jpg'
import { Form, Button, Spinner } from 'react-bootstrap'
import { FormEvent, useState } from 'react'

export default function Home() {
  const [quote, setQuote] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const prompt = formData.get('prompt')?.toString().trim();

    if (prompt) {
      try {
        setQuote('');
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await fetch('/api/hello?prompt=' + encodeURIComponent(prompt));
        const body = await response.json();
        setQuote(body.quote);
      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Cringe AI - Create cringy motivational quotes</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Sad Beshy AI</h1>
        <div>Enter a topic and it will generate a super cringy motivational quote for my Beshy</div>
        <div className={styles.mainImageContainer}>
          <Image
            src={mainImage}
            fill

            alt='image'
            priority={true}
            className={styles.mainImage}
          />
        </div>
        <Form onSubmit={handleSubmit} className={styles.inputForm}>
          <Form.Group className='mb-3' controlId='prompt-input'>
            <Form.Label>Bat🤸Malungkot🤸Ang🤸Beshy🤸Ko ?</Form.Label>
            <Form.Control
              name='prompt'
              placeholder='ex. no money, broken hearted, pangit'
              maxLength={100}
            />
          </Form.Group>
          <Button type='submit'    className='bg-purple-400 mb-3' disabled={quoteLoading}>
            Make me Cringe
          </Button>
        </Form>
        {quoteLoading && <Spinner animation='border' />}
        {quoteLoadingError && "Something went wrong. Please try again."}
        {quote && <h5 className={styles.ans}>{quote}</h5>}
     
      </main>
    </>
  );
}