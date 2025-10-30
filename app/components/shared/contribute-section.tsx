import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function ContributeSection() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container px-4 mx-auto text-center">
        <div className="max-w-2xl mx-auto ">
          <h2 className="text-3xl md:text-4xl fonr-bold mb-4">
            {' '}
            Ready to Share Your Knowledge?
          </h2>
          <p className="text-primary-foreground/90 mb-10 text-lg">
            {' '}
            Contribute to our growing repository of knowledge and connect with a
            community of researchers
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="tex-base py-6 px-8"
          >
            <Link href="/contribute">Start Contributing</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ContributeSection
