"use client"
import { Button } from '@/app/components/ui/button'
import { motion } from 'framer-motion'
import { LucideArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TermsOfService() {
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


            {/* header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-8 md:p-12 text-center mb-24"
            >

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.1),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(202,138,4,0.1),transparent_50%)]" />

                <h1 className="text-4xl md:text-5xl mb-4"> Terms Of Service</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Effective Date: October 24, 2025
                </p>

            </motion.div>

            <div className='max-w-7xl mx-auto space-y-0'>



                <section className='mb-24 max-w-full'>

                    <div className="mb-12">
                        <h2 className='text-3xl md:text-4xl mb-4'>1 Acceptance & Scope</h2>


                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] p-8 md:p-12 lg:p-16 mb-6 "
                        >
                            <div className=" relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
                                <div className="text-white/80 space-y-4">

                                    <p className="text-white/80 leading-relaxed ">
                                        By using kitsohub.org, you agree to:
                                    </p>
                                    <br />

                                    <p className="text-white/80 leading-relaxed">
                                        1) Respect Traditional Knowledge Labels™ (e.g., "Women-Only Knowledge," "Elder-Approved") <br />
                                        2) Comply with Botswana's National Innovation Policy (2019) and Nagoya Protocol <br />
                                        3) Acknowledge that CC BY licensing does NOT apply to Restricted/Sacred knowledge.
                                    </p>
                                </div>


                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* Permitted Use */}

                <section className='mb-24 max-w-full'>

                    <div className="mb-12">
                        <h4 className='text-2xl md:text-3xl mb-4'>
                            2. Permitted Use
                        </h4>

                    </div>

                    <div className="relative overflow-x-auto">
                        {/*
            <div className="mb-12">
              <h4 className='text-2xl md:text-3xl mb-4'>1.5 Data We Collect & Why</h4>

            </div> */}
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        User Type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Allowed Actions
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Restrictions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Community Members
                                    </th>
                                    <td className="px-6 py-4">
                                        Researchers
                                    </td>
                                    <td className="px-6 py-4">
                                        Government
                                    </td>
                                    <td className="px-6 py-4">
                                        General Public
                                    </td>


                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Submit knowledge; Approve access requests
                                    </th>
                                    <td className="px-6 py-4">
                                        Search public knowledge; Request restricted access
                                    </td>
                                    <td className="px-6 py-4">
                                        Integrate with agricultural databases
                                    </td>
                                    <td className="px-6 py-4">
                                        View CC BY-tagged content                  </td>

                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Must verify identity via community-appointed elders
                                    </th>
                                    <td className="px-6 py-4">
                                        Must sign benefit-sharing agreement for commercial use
                                    </td>
                                    <td className="px-6 py-4">
                                        Requires Khoisan Council approval for sensitive data
                                    </td>
                                    <td className="px-6 py-4">
                                        Prohibited from downloading Restricted/Sacred knowledge
                                    </td>

                                </tr>

                            </tbody>
                        </table>
                    </div>

                </section>

                {/* prohibitions */}

                <section className='mb-24 max-w-full'>

                    <div className="mb-12">
                        <h2 className='text-3xl md:text-4xl mb-4'>3 Critical Prohibitions</h2>


                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#8a2b1e] to-[#f6ca3b] p-8 md:p-12 lg:p-16 mb-6 "
                        >
                            <div className=" relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ">
                                <div className="text-white/80 space-y-4">

                                    <p className="text-white/80 leading-relaxed ">
                                        By using kitsohub.org, you agree to:
                                    </p>
                                    <br />

                                    <p className="text-white/80 leading-relaxed">
                                        1) Never attempt to bypass cultural access controls (e.g., falsifying elder approval). <br />
                                        2) Never commercialize knowledge without benefit-sharing agreement (royalties ≥15%). <br />
                                        3) Never extract geotags for sacred sites (violators face kgotla tribunal referral).
                                    </p>
                                </div>


                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* termination */}

                <section className='mb-24 max-w-full'>
                    <div className="mb-12">
                        <h4 className='text-2xl md:text-3xl mb-4'>4 Termination </h4>
                        <p className="text-lg text-muted-foreground max-w-3xl">
                            Violations triggers:
                        </p>
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

                            <p className="text-sm text-muted-foreground">
                                Immediate suspension of access
                            </p>

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
                                Mandatory mediation with community elders
                            </p>

                        </motion.div>
                        <motion.div

                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1 * 0.05 }}
                            className="border-l-4 border-primary pl-4 py-2"
                        >
                            <h4 className="mb-2">For commercial entities</h4>

                            <p className="text-sm text-muted-foreground">
                                Automatic royalty claims via Botswana's Intellectual Property Office

                            </p>

                        </motion.div>

                    </div>


                </section>

                <section className='mb-24 max-w-full'>

                    <div className="mb-12">
                        <h4 className='text-2xl md:text-3xl mb-4'>5 Platform Disclaimer</h4>

                    </div>
                    <p className="text-lg text-muted-foreground max-w-3xl">
                        Kitso-Hub is provided "as is" under community stewardship. The Open Source Botswana Community:

                    </p>
                    <br />

                    <p className="text-white/80 leading-relaxed">
                        1) Is not liable for misuse of knowledge by third parties. <br />
                        2) Reserves the right to remove content violating cultural protocols. <br />
                        3) Acknowledges University of Botswana and UNDP-UNIPOD as funders (not owners).
                    </p>
                </section>

            </div>
        </div>
    )
}
