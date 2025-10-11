"use client"
import TeamDirectory from '@/app/components/about/teamDirectory'
import { Badge } from '@/app/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { useAboutUsStore } from '@/lib/store/aboutUsStore'
import { motion } from 'framer-motion'
import { BookOpen, Calendar, Crown, Eye, Target, TrendingUp } from 'lucide-react'
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
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 mt-28">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 p-8 md:p-12 text-center"
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


            {/* Mission & Vision */}
      <section>
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
              <p className="text-lg leading-relaxed">{aboutUsContent.ikms.vision}</p>
            </CardContent>
          </MotionCard>
        </div>
      </section>

      <section>
            <SectionHeader title="Our Team" index={1} />
        <div className="container mx-auto px-4 py-8 relative z-10">
            <TeamDirectory/>
        </div>
      </section>


    </div>
  )
}
