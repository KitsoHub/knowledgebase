'use client'
import { Button } from '@/app/components/ui/button'
import { motion } from 'framer-motion'
import { LucideArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function PrivacyPolicy() {
  const router = useRouter()
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

          <Button
                onClick={() => router.back()}
                variant={'ghost'}
                size="icon"
                className="mb-9"
              >
                <LucideArrowLeft size={20} />
                <span>Back</span>
              </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-8 md:p-12 text-center mb-24"
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(202,138,4,0.1),transparent_50%)]" />

        <h1 className="text-4xl md:text-5xl mb-4"> Privacy Policy</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Preserving, protecting, and sharing traditional knowledge with respect for Indigenous cultural protocols and community sovereignty.
        </p>

      </motion.div>

      <div className='max-w-7xl mx-auto space-y-0'>

        <section className='mb-24 max-w-full'>

          <div className="mb-12">
            <h2 className='text-3xl md:text-4xl mb-4'>1.1 Overview</h2>


            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] p-8 md:p-12 lg:p-16 mb-6 "
            >
              <div className=" relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
                <div className="text-white/80 space-y-4">

                  <p className="text-white/80 leading-relaxed ">
                    KitsoHub, NIKMS and the TswaLingo Mobile App are all part of an open-source, NGO project aiming to empower communities to manage, share, narrate and exchange their digital heritage in culturally relevant and ethically minded ways. We are committed to maintaining an open, community-driven approach to the NIKMS continued development. Our first priority is to help build a platform that fosters relationships of respect and trust.
                  </p>
                  <br />

                  <p className="text-white/80 leading-relaxed">
                    As a matter of practice, we do not actively collect or share personally identifiable information about our users through the technologies or websites we provide. Any personally identifiable information is submitted by a user to either: <br />
                    1) Create an account on our Mukurtu Demo site; <br />
                    2) Subscribe to our email list or<br />
                    3) As a part of a KitsoHub Support ticket (submitted through email).
                  </p>
                </div>


              </div>
            </motion.div>
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">1.2 Definitions</h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >

              <h3 className="mb-2">Non-personal information</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Non-personal information includes anonymous usage data, referring/exit pages and URLs, platform types and any other data provided by your browser or mobile device as you view a webpage or use an IKMS service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >

              <h3 className="mb-2">Personally identifiable information</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Personally identifiable information includes user email address and any preferences or general demographic information that may be submitted to use a KitsoHub service.
              </p>
            </motion.div>




          </div>

          <div className="mb-12">
            <h3 className="mb-2">kitsohub.org (this website)</h3>
            <p className="text-lg text-muted-foreground max-w-3xl">
              While no personally identifiable information is collected while a user views the kitsohub.org website, we do employ google analytics to collect non-personal information in an effort to track and analyze our website and improve our communication and engagement. We only share this information abstracted into reports when required by granting agencies. We track this information using cookies, or small text files which include an anonymous unique identifier. Cookies are sent to a user’s browser from our servers and are stored on the user’s computers. Sending a cookie to a user’s browser enables us to collect non-personal information about that user’s interaction with the kitsohub.org website.

            </p>
          </div>

          <div className="mb-12">
            <h3 className="mb-2"> IKMS and TswaLingo Mobile Application 1.0</h3>
            <p className="text-lg text-muted-foreground max-w-3xl">
              The TswaLingo Mobile application does not collect or send any information off-device for use by the developers of IKMS or TswaLingo Mobile. Any information that is synced to or created through the app is stored in the user's connected IKMS CMS instance and is subject to the privacy policy of the connected website.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="mb-2">KitsoHub Newsletter</h3>
            <p className="text-lg text-muted-foreground max-w-3xl">

              We collect the user’s email address and several pieces of demographic information so we can periodically send updates and information about IKMS CMS and affiliated services. We do not share this information with any third-party.

            </p>
          </div>
          <div className="mb-12">
            <h3 className="mb-2"> KitsoHub Support</h3>
            <p className="text-lg text-muted-foreground max-w-3xl">
              In order to use our free Kitsohub support services a user must submit basic troubleshooting information and their email address so we can provide help. This information is not shared with any third party.


            </p>
          </div>



        </section>

        <section className='mb-24'>
          <div className="mb-12">
            <h4 className='text-2xl md:text-3xl mb-4'>1.4 Special Protections for Indigenous Knowledge</h4>

          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24'>

            <motion.div

              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 * 0.05 }}
              className="border-l-4 border-primary pl-4 py-2"
            >
              <h4 className="mb-2">Cultural Sensitivity Tiers</h4>

              <p className="text-sm text-muted-foreground">Knowledge is classified as Public, Community, Restricted, or Sacred per community-defined protocols. Only Public-tier knowledge falls under standard CC BY licensing.</p>

            </motion.div>



            <motion.div

              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 * 0.05 }}
              className="border-l-4 border-primary pl-4 py-2"
            >
              <h4 className="mb-2">Elder Council Consent Framework</h4>

              <p className="text-sm text-muted-foreground">
                Access to Restricted/Sacred knowledge requires documented approval from community elders via SMS/IKMS verification workflows. No personal data is stored without explicit and collective consent.
              </p>

            </motion.div>
            <motion.div

              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 * 0.05 }}
              className="border-l-4 border-primary pl-4 py-2"
            >
              <h4 className="mb-2">Benefit-Sharing Tracking</h4>

              <p className="text-sm text-muted-foreground">
                Commercial use of knowledge triggers automatic royalty allocation to Botswana's Traditional Knowledge Benefit-Sharing Fund (per Nagoya Protocol).
              </p>

            </motion.div>

          </div>



          <div className="relative overflow-x-auto">

            <div className="mb-12">
              <h4 className='text-2xl md:text-3xl mb-4'>1.5 Data We Collect & Why</h4>

            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Data Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Purpose
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Protection Measures
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    User Accounts
                  </th>
                  <td className="px-6 py-4">
                    Community verification
                  </td>
                  <td className="px-6 py-4">
                    Encrypted storage; language consent forms
                  </td>

                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Access Logs
                  </th>
                  <td className="px-6 py-4">
                    Audit cultural protocol compliance
                  </td>
                  <td className="px-6 py-4">
                    Zero-knowledge proofs; 90-day automatic deletion
                  </td>

                </tr>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Knowledge Submissions
                  </th>
                  <td className="px-6 py-4">
                    Preserve oral traditions
                  </td>
                  <td className="px-6 py-4">
                    Offline-first storage; elder approval required before digital processing
                  </td>

                </tr>

                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Geotags
                  </th>
                  <td className="px-6 py-4">
                    Map territory-specific knowledge
                  </td>
                  <td className="px-6 py-4">
                    Coordinates masked beyond 5km radius for sacred sites
                  </td>

                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-12">
            <h4 className='text-2xl md:text-3xl mb-4'>1.6 Your Rights</h4>

          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24'>

            <motion.div

              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 * 0.05 }}
              className="border-l-4 border-primary pl-4 py-2"
            >
              <h4 className="mb-2">Community Veto</h4>

              <p className="text-sm text-muted-foreground">
                Any indigenous group may request removal of knowledge through digital repatriation.
              </p>

            </motion.div>



            <motion.div

              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 * 0.05 }}
              className="border-l-4 border-primary pl-4 py-2"
            >
              <h4 className="mb-2">Access Transparency</h4>

              <p className="text-sm text-muted-foreground">
                View all access requests to your community's knowledge via dashboard.
              </p>

            </motion.div>
            <motion.div

              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 * 0.05 }}
              className="border-l-4 border-primary pl-4 py-2"
            >
              <h4 className="mb-2">Data Portability</h4>

              <p className="text-sm text-muted-foreground">
                Export non-sensitive knowledge in CC BY format for community archives.

              </p>

            </motion.div>

          </div>


        </section>


      </div>
    </div>
  )

}
