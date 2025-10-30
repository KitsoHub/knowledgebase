import { motion } from 'framer-motion'
import React from 'react'
import { Card } from '../ui/card'
import { ArrowRight, Crown, GraduationCap, Heart, Shield } from 'lucide-react'
import { ImageWithFallback } from '../shared/image-with-fallback'
import { Button } from '../ui/button'
import { useAboutUsStore } from '@/lib/store/aboutUsStore'
import { Badge } from '../ui/badge'

const MotionDiv = motion.div
const MotionCard = motion.create(Card)

export default function AboutNewsInsights() {
  const { aboutUsContent } = useAboutUsStore()
  const { ikms, governance, joinTeam } = aboutUsContent
  return (
    <>
      <section className="mb-24">
        <h2 className="text-3xl md:text-4xl mb-8">News and Insights</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {/* Insight Card 1 */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#1e40af] to-[#3b82f6] h-48 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <Crown className="h-16 w-16 text-white/20" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              IK PORTAL TEAM • OCT 15, 2024
            </p>
            <h3 className="mb-3 group-hover:text-primary transition-colors">
              Launching the Indigenous Knowledge Portal: Empowering community
              governance
            </h3>
            <button className="inline-flex items-center text-sm hover:gap-3 gap-2 transition-all group">
              Read more
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </MotionDiv>

          {/* Insight Card 2 */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg h-48 mb-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1665708468457-08c52d98cada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwZWxkZXJzJTIwdGVhY2hpbmd8ZW58MXx8fHwxNzYxMDkwMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Traditional knowledge"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              IK PORTAL TEAM • SEP 24, 2024
            </p>
            <h3 className="mb-3 group-hover:text-primary transition-colors">
              TK Labels in action: How communities protect sacred knowledge
            </h3>
            <button className="inline-flex items-center text-sm hover:gap-3 gap-2 transition-all group">
              Read more
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </MotionDiv>

          {/* Insight Card 3 */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#ca8a04] to-[#d4a03a] h-48 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="h-16 w-16 text-white/20" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              IK PORTAL TEAM • AUG 12, 2024
            </p>
            <h3 className="mb-3 group-hover:text-primary transition-colors">
              Building with communities: Our approach to co-design and
              sovereignty
            </h3>
            <button className="inline-flex items-center text-sm hover:gap-3 gap-2 transition-all group">
              Read more
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </MotionDiv>
        </div>
      </section>

      <section className="mb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 border p-8 md:p-12 mb-24">
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl mb-4">Join our mission</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Help preserve and protect Indigenous knowledge for future
              generations
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() =>
                  (window.location.href = 'mailto:volunteer@ikportal.org')
                }
              >
                <Heart className="h-4 w-4 mr-2" />
                Volunteer with us
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() =>
                  (window.location.href = 'mailto:internships@ikportal.org')
                }
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Apply for internship
              </Button>
            </div>

            {joinTeam.openPositions && joinTeam.openPositions.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <span className="text-sm text-muted-foreground mb-4">
                  <Badge variant="secondary" className="mr-2">
                    {joinTeam.openPositions.length}
                  </Badge>
                  Open positions available
                </span>
                <button className="inline-flex items-center text-sm hover:gap-3 gap-2 transition-all group text-primary">
                  View open positions
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
