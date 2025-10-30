"use client"
import AboutNewsInsights from '@/app/components/about/newsInsights'
import TeamDirectory from '@/app/components/about/teamDirectory'
import { ImageWithFallback } from '@/app/components/shared/image-with-fallback'
import { Badge } from '@/app/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { useAboutUsStore } from '@/lib/store/aboutUsStore'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Calendar, Crown, Eye, Globe, Shield, Target, TrendingUp, Users } from 'lucide-react'
import React from 'react'


const MotionCard = motion.create(Card);

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  index: number;
}


function SectionHeader({ title, subtitle, index }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl mb-8"
    >
      {/* Pattern background with earth tone overlay */}
      <div className="relative h-32 md:h-40 bg-gradient-to-br from-[#ca8a04] via-[#d4a03a] to-[#ca8a04]">
        {/* Geometric pattern using CSS */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.3) 49%, rgba(255,255,255,0.3) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.3) 49%, rgba(255,255,255,0.3) 51%, transparent 52%)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Diamond pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.4) 20px, rgba(255,255,255,0.4) 22px),
              repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.4) 20px, rgba(255,255,255,0.4) 22px)
            `,
          }}
        />

        {/* Animated overlay patterns */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear"
          }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-white px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl text-center mb-2 text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="text-center text-white/90 text-lg">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const { aboutUsContent } = useAboutUsStore();
  const { ikms, governance } = aboutUsContent;
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 mt-28">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-8 md:p-12 text-center mb-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,64,175,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(202,138,4,0.1),transparent_50%)]" />

        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1.1, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
          className="inline-block mb-4"
        >
          {/* <Crown className="h-12 w-12 text-primary mx-auto" /> */}
        </motion.div>

        <h1 className="text-4xl md:text-5xl mb-4"> National Indigenous Knowledge Management System</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Preserving, protecting, and sharing traditional knowledge with respect for Indigenous cultural protocols and community sovereignty.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-0">
        {/* Our Story Hero */}
        <section className="mb-24">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">OUR STORY</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
              From community vision to<br />Indigenous knowledge platform
            </h1>
          </div>

          {/* 2019 - Foundations */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] p-8 md:p-12 lg:p-16 mb-6"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm mb-6">
                  2024
                </div>
                <h2 className="text-3xl md:text-4xl mb-6 text-white">Foundations</h2>
                <p className="text-lg leading-relaxed text-white/90 mb-4">
                  {ikms.mission}
                </p>
                <p className="text-white/80 leading-relaxed">
                  Since then, we've remained focused on building a platform that respects Indigenous
                  sovereignty and cultural protocols while enabling communities to preserve and share
                  their traditional knowledge on their own terms.
                </p>
              </div>

              {/* Tilted Photos - Polaroid Style */}
              <div className="relative h-[300px] lg:h-[400px] hidden lg:block">
                <motion.div
                  initial={{ rotate: -5, y: 20 }}
                  animate={{ rotate: -8, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute top-0 right-20 w-64 h-72 bg-white p-3 shadow-2xl rounded-sm"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758517821242-3d9d73ef550b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc2MTA5MDI2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Community gathering"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ rotate: 5, y: 20 }}
                  animate={{ rotate: 10, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute top-12 right-0 w-56 h-64 bg-white p-3 shadow-2xl rounded-sm"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1759052863882-eb2667c688e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGtub3dsZWRnZSUyMHNoYXJpbmd8ZW58MXx8fHwxNzYxMDkwMjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Knowledge sharing"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* 2024-2025 - Growth */}
          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ddd6fe] via-[#c4b5fd] to-[#a78bfa] p-8 md:p-12 lg:p-16 mb-6"
          >
            <div className="inline-block px-3 py-1 bg-white/30 rounded-full text-sm mb-6">
              2024 - 2025
            </div>
          </motion.div> */}

          {/* Community Focus */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#fef3c7] to-[#fde68a] border-2 border-[#ca8a04]/20 p-8 md:p-12 lg:p-16"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block px-3 py-1 bg-[#ca8a04]/10 rounded-full text-sm mb-6 text-[#ca8a04]">
                  2024 - 2025
                </div>
                <h2 className="text-3xl md:text-4xl mb-6">Community governance</h2>
                <p className="text-lg leading-relaxed mb-4">
                  In 2025, we launched our community governance framework, ensuring that Indigenous
                  communities maintain full sovereignty over their knowledge and cultural heritage.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Today, our platform serves multiple communities with comprehensive TK Label management,
                  protocol-based access control, and cultural context preservation across all content types.
                </p>
                <button className="inline-flex items-center text-[#ca8a04] hover:gap-3 gap-2 transition-all group">
                  Learn more
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Tilted Photos */}
              <div className="relative h-[300px] lg:h-[400px] hidden lg:block">
                <motion.div
                  initial={{ rotate: -5, y: 20 }}
                  whileInView={{ rotate: -6, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="absolute top-0 right-20 w-64 h-72 bg-white p-3 shadow-2xl rounded-sm"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1759193529611-40ef867726fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB0ZWNobm9sb2d5JTIwaHVifGVufDF8fHx8MTc2MTA5MDI2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Technology hub"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ rotate: 5, y: 20 }}
                  whileInView={{ rotate: 8, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute top-16 right-0 w-56 h-64 bg-white p-3 shadow-2xl rounded-sm"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1567356539216-027d8d6fd50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJjaGl2ZSUyMHdvcmt8ZW58MXx8fHwxNzYxMDkwMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Archive work"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Bottom progress line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e40af] via-[#ca8a04] to-[#1e40af]" />
          </motion.div>
        </section>


        {/* Mission & Vision */}
        {/* <section>
        <SectionHeader title="Our Mission & Vision" index={0} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MotionCard
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{aboutUsContent.ikms.mission}</p>
            </CardContent>
          </MotionCard>

          <MotionCard
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl" />
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Eye className="h-5 w-5 text-secondary" />
                </div>
                <CardTitle>Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{ikms.vision}</p>
            </CardContent>
          </MotionCard>
        </div>
      </section> */}

        {/* Platform Features */}
        <section className="mb-24">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Core Features</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Built with respect for Indigenous knowledge and community sovereignty
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl inline-block">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2">Cultural Protocol Protection</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Traditional Knowledge Labels ensure cultural protocols are respected and enforced at every level
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <div className="mb-4 p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-xl inline-block">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-2">Community Governance</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Each community maintains full sovereignty over their knowledge and cultural heritage
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <div className="mb-4 p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 rounded-xl inline-block">
                <Globe className="h-8 w-8 text-[#ca8a04]" />
              </div>
              <h3 className="mb-2">Distributed Architecture</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Decentralized storage ensures no single entity controls Indigenous knowledge
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <div className="mb-4 p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900 rounded-xl inline-block">
                <BookOpen className="h-8 w-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="mb-2">Multi-Format Support</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Preserve knowledge in audio, video, text, and image formats with cultural context
              </p>
            </motion.div>
          </div>
        </section>


        {/* Vision Statement */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl leading-tight mb-24">
              {ikms.vision}
            </h3>
          </motion.div>
        </section>


        {/* Governance */}
        <section className='mb-24'>
          <div className="mb-12">
            <h2 className='text-3xl md:text-4xl mb-4'>Our Principles</h2>
            <p className="text-muted-foreground max-w-3xl">{governance.structure}</p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24'>
            {governance.principles.map((principle, index) => {
              const [title, description] = principle.split(': ');
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border-l-4 border-primary pl-4 py-2"
                >
                  <h4 className="mb-2">{title}</h4>
                  {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                  )}
                </motion.div>
              )
            })}
          </div>

        </section>

        <section className="mb-24">
          {/* <SectionHeader title="Our Team" index={1} /> */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl mb-4">Our Team</h2>
              <p className="text-lg text-muted-foreground">
                Meet the dedicated individuals preserving Indigenous knowledge
              </p>
            </div>

          </div>
          <div className="container mx-auto px-4 py-8 relative z-10 mb-24">
            <TeamDirectory />
          </div>
        </section>
        <AboutNewsInsights />


      </div>
    </div>
      )
}
