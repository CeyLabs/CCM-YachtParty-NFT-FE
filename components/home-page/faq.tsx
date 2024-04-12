"use client"
import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { color } from "framer-motion";
import { Link } from "lucide-react";
  
  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="relative mx-auto w-full lg:w-1/2 px-10 py-20">
        <AccordionItem value="item-1">
          <AccordionTrigger>🛥 What is the Halving Yacht Party?</AccordionTrigger>
          <AccordionContent>
            The Halving Yacht Party is an exclusive event limited to 50 participants, organized by Ceylon Crypto Meetup. It's an opportunity for networking and celebration within the crypto community.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>🏖 How can I attend to this Party?</AccordionTrigger>
          <AccordionContent>
            To attend the Halving Yacht Party, you need to mint a non-virtual ticket through our NFT ticket minting page. Only 50 non-virtual tickets will be available. Alternatively, if you're interested in a virtual ticket, there may be some future benefits attached 😉 
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>🎟 How much does a ticket cost?</AccordionTrigger>
          <AccordionContent>
            For non-discounted participants, physical tickets are sold at $100 or 0.03ETH on the Arbitrum network.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>💰 What is the available discount?</AccordionTrigger>
          <AccordionContent>
            Participants; who holds the CCM genesis NFT are eligible for a discounted physical ticket price of $75 or 0.0225ETH, which is a 25% discount.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>✅ How can I qualify for a discounted ticket??</AccordionTrigger>
          <AccordionContent>
            <ul>
                <li>You can qualify for a discounted ticket if you hold the CCM genesis NFT. Alternatively, you may also qualify for a discounted ticket if you meet one or more of the following criteria:</li>
                <br></br>
                <ul>
                    <li>
                        &nbsp;&nbsp;&nbsp;&nbsp;🪙 Hold more than 1 BTC in your portfolio.
                    </li>
                    <br></br>
                    <li>
                        &nbsp;&nbsp;&nbsp;&nbsp;🔗 Have been on-chain for more than 1000 days.
                    </li>
                    <br></br>
                    <li>
                        &nbsp;&nbsp;&nbsp;&nbsp;📜 Belong to specific whitelists provided through <a target="_blank" href="https://t.me/cryptokalliya" style={{color:"#F6931A"}}>Crypto Kalliya</a> Telegram and <a target="_blank" href="https://chat.whatsapp.com/JnrIht3av6oJxo9oyOyKYQ" style={{color:"#F6931A"}}>Ceylon Cash</a> Whatsapp Groups.
                    </li>
                </ul>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>⏳ When will the ticket minting be available?</AccordionTrigger>
          <AccordionContent>
            Ticket minting will be available for a limited time. Keep an eye on our official channels for announcements regarding the opening and closing of ticket minting.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>❌ What happens if I miss out on minting a ticket?</AccordionTrigger>
          <AccordionContent>
            If you miss out on minting a physical ticket, unfortunately, you won't be able to attend the Halving Yacht Party. Ensure you stay updated on announcements for future events and opportunities within the Ceylon Crypto Meetup community.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  

