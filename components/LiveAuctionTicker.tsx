'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function LiveAuctionTicker() {
  const [auctionStatus] = useState({
    status: 'LIVE',
    saleNumber: 'Week 27',
    currentLot: 'Lot 847',
    nextLot: 'Lot 848',
    teaType: 'Western High Grown',
    price: 'Rs. 850/kg',
  })

  return (
    <div className="bg-gradient-to-r from-[var(--maroon)] to-[#5d1928] text-white overflow-hidden">
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-8 px-4 py-3"
      >
        {/* Live Indicator */}
        <div className="flex items-center gap-2 shrink-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full bg-green-400"
          />
          <span className="text-xs font-bold tracking-wider uppercase">Live Auction</span>
        </div>

        {/* Auction Details */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs uppercase tracking-wider">Sale:</span>
            <span className="font-semibold">{auctionStatus.saleNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs uppercase tracking-wider">Current:</span>
            <span className="font-semibold">{auctionStatus.currentLot}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs uppercase tracking-wider">Type:</span>
            <span className="font-semibold">{auctionStatus.teaType}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs uppercase tracking-wider">Price:</span>
            <span className="font-semibold text-amber-300">{auctionStatus.price}</span>
          </div>
        </div>

        {/* Mobile View - Compact */}
        <div className="md:hidden flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs">Sale {auctionStatus.saleNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{auctionStatus.currentLot}</span>
          </div>
        </div>

        {/* View Auction Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="shrink-0 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          View Auction
        </motion.button>
      </motion.div>
    </div>
  )
}
