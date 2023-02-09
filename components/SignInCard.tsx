import React from 'react'
import Image from 'next/image';
import googleIcon from "@/public/images/google-icon.svg";
import facebookIcon from "@/public/images/facebook-icon.svg";
import twitterIcon from "@/public/images/twitter-icon.svg";
import githubIcon from "@/public/images/github-icon.svg";
import styles from '@/styles/components/SignInCard.module.scss'

export default function SignInCard() {
  return (
    <div className={styles.signInCard}>
            <p>Sign In</p>
            <button>
              <div>
                <Image src={googleIcon} alt="google icon" />
                <span>Sign In with Google</span>
              </div>
            </button>
            <button>
              <div>
                <Image src={facebookIcon} alt="facebook icon" />
                <span>Sign In with Facebook</span>
              </div>
            </button>
            <button>
              <div>
                <Image src={twitterIcon} alt="twitter icon" />
                <span>Sign In with Twitter</span>
              </div>
            </button>
            <button>
              <div>
                <Image src={githubIcon} alt="github icon" />
                <span>Sign In with GitHub</span>
              </div>
            </button>
            <button className={styles.demoBtn}><div>Demo</div></button>
      </div>
  )
}
