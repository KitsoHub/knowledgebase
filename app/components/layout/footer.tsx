/* eslint-disable @next/next/no-img-element */

import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function MainFooter() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="text-center space-y-8">
          {/* Company Description */}
          <div className="max-w-4xl mx-auto">
            <p className="text-sm sm:text-base leading-relaxed text-gray-300">
              kitso-Hub is managed by the{" "}
              <Link href="https://github.com/Open-Source-Botswana" className="text-orange-400 hover:text-orange-300 transition-colors">
                Open Source Botswana Community
              </Link>{" "}
              in Gaborone Botswana. The IKMS platform and all materials on kitsohub.org are
              distributed under the terms of the{" "}
              <Link href="#" className="text-orange-400 hover:text-orange-300 transition-colors">
                Creative Commons Attribution License
              </Link>{" "}
              (or &ldquo;CC BY&ldquo;), which means anyone is free to download and share them with others. KitsoHub is funded in
              part by the UNDP via UNIPOD, the University of Botswana, the University of Botswana Research Department.
            </p>
          </div>

          {/* Acknowledgment Statement */}
          <div className="max-w-4xl mx-auto">
            <p className="text-sm italic text-gray-400 leading-relaxed">
              The San Center for Research is located at the University of Botswana in collaboration with indigenous communities who have
              been stewards cultural, historical and indigenous knowledge. We acknowledge their presence here and recognize their
              continuing connection to the diverse traditions of the people of Botswana.
            </p>
          </div>

          {/* Partner Logos */}
          <div className="pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-4xl mx-auto">

              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center">
                    <img src="/assets/partnerLogos/WeThemba.jpeg" alt="WeThemba Logo" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-semibold text-gray-300">WeThemba</div>
                  <div className="text-xs sm:text-sm font-bold text-white">Developers</div>
                  <div className="text-xs text-gray-400">& Reseachers</div>
                </div>
              </div>


              <div className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center">
                    <img src="/assets/partnerLogos/UNIPOD.png" alt="UNIPOD Logo" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-semibold text-gray-300">UNIPOD</div>
                  <div className="text-xs sm:text-sm font-bold text-white">Facilitators</div>
                  <div className="text-xs text-gray-400">ASSOCIATION</div>
                </div>
              </div>


              <div className="flex flex-col items-center space-y-2">
                 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center">
                    <img src="/assets/partnerLogos/UB-logo.png" alt="UB Logo" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-semibold text-gray-300">Research and Innovation</div>
                  <div className="text-xs sm:text-sm font-bold text-white">Department</div>
                  <div className="text-xs text-gray-400">ASSOCIATION</div>
                </div>
              </div>


              <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center">
                    <img src="/assets/partnerLogos/UB-logo.png" alt="San Center Logo" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-semibold text-gray-300">The San Research Centre</div>
                  <div className="text-xs sm:text-sm font-bold text-white">Department</div>
                  <div className="text-xs text-gray-400">ASSOCIATION</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <Link href="/privacy" className="text-orange-400 hover:text-orange-300 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-orange-400 hover:text-orange-300 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-orange-400 hover:text-orange-300 transition-colors text-sm">
                Accessibility
              </Link>
              <Link href="/contact" className="text-orange-400 hover:text-orange-300 transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-4">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} KitsoHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
