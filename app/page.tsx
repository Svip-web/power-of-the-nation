"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";

type Language = "ua" | "en";

const githubPagesBasePath = "/power-of-the-nation";

function assetPath(path: string) {
  if (!path.startsWith("/")) {
    return path;
  }

  if (typeof window === "undefined") {
    return path;
  }

  const isGitHubPagesProject =
    window.location.pathname === githubPagesBasePath ||
    window.location.pathname.startsWith(`${githubPagesBasePath}/`);

  return isGitHubPagesProject ? `${githubPagesBasePath}${path}` : path;
}

const siteCopy = {
  ua: {
    nav: {
      home: "Р вЂњР С•Р В»Р С•Р Р†Р Р…Р В°",
      directions: "Р СњР В°Р С—РЎР‚РЎРЏР СР С”Р С‘",
      founders: "Р вЂ”Р В°РЎРѓР Р…Р С•Р Р†Р Р…Р С‘Р С”Р С‘",
      projects: "Р СџРЎР‚Р С•РЎвЂќР С”РЎвЂљР С‘",
      contacts: "Р С™Р С•Р Р…РЎвЂљР В°Р С”РЎвЂљР С‘",
    },
    support: "Р СџРЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР В°РЎвЂљР С‘",
    partner: "Р РЋРЎвЂљР В°РЎвЂљР С‘ Р С—Р В°РЎР‚РЎвЂљР Р…Р ВµРЎР‚Р С•Р С",
    learnMore: "Р вЂќРЎвЂ“Р В·Р Р…Р В°РЎвЂљР С‘РЎРѓРЎРЏ Р В±РЎвЂ“Р В»РЎРЉРЎв‚¬Р Вµ",
    join: "Р вЂќР С•РЎвЂќР Т‘Р Р…Р В°РЎвЂљР С‘РЎРѓРЎРЏ",
    hero: {
      eyebrow: "Р РЋР С‘Р В»Р В° Р Р…Р В°РЎвЂ РЎвЂ“Р в„–. Р вЂњРЎС“Р СР В°Р Р…РЎвЂ“РЎвЂљР В°РЎР‚Р Р…Р С‘Р в„– Р В°Р В»РЎРЉРЎРЏР Р…РЎРѓ",
      title: "Power of the Nation РІР‚вЂќ Humanitarian Alliance",
      lead: "Р вЂњРЎР‚Р С•Р СР В°Р Т‘РЎРѓРЎРЉР С”Р В° РЎРѓР С—РЎвЂ“Р В»Р С”Р В° Р Т‘Р В»РЎРЏ РЎР‚Р ВµР В°Р В»РЎвЂ“Р В·Р В°РЎвЂ РЎвЂ“РЎвЂ” РЎРѓРЎС“РЎРѓР С—РЎвЂ“Р В»РЎРЉР Р…Р С• Р С”Р С•РЎР‚Р С‘РЎРѓР Р…Р С‘РЎвЂ¦ РЎвЂ“Р Р…РЎвЂ“РЎвЂ РЎвЂ“Р В°РЎвЂљР С‘Р Р†, Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р С‘ Р С–РЎР‚Р С•Р СР В°Р Т‘РЎРЏР Р… РЎвЂљР В° РЎР‚Р С•Р В·Р Р†Р С‘РЎвЂљР С”РЎС“ Р С–РЎР‚Р С•Р СР В°Р Т‘РЎРЏР Р…РЎРѓРЎРЉР С”Р С•Р С–Р С• РЎРѓРЎС“РЎРѓР С—РЎвЂ“Р В»РЎРЉРЎРѓРЎвЂљР Р†Р В°",
    },
    directions: {
      eyebrow: "Р СњР В°Р С—РЎР‚РЎРЏР СР С”Р С‘",
      title: "Р С™Р В»РЎР‹РЎвЂЎР С•Р Р†РЎвЂ“ Р Р…Р В°Р С—РЎР‚РЎРЏР СР С”Р С‘ Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…Р С•РЎРѓРЎвЂљРЎвЂ“",
    },
    founders: {
      eyebrow: "Р СњР В°РЎв‚¬РЎвЂ“ Р В·Р В°РЎРѓР Р…Р С•Р Р†Р Р…Р С‘Р С”Р С‘",
      title: "Р С›Р В±'РЎвЂќР Т‘Р Р…Р В°Р Р…РЎвЂ“ РЎРѓР С—РЎвЂ“Р В»РЎРЉР Р…Р С•РЎР‹ Р СР ВµРЎвЂљР С•РЎР‹ - РЎРѓР В»РЎС“Р В¶Р С‘РЎвЂљР С‘ Р В»РЎР‹Р Т‘РЎРЏР С РЎвЂљР В° Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎвЂ“",
      lead: "Р СћРЎР‚Р С‘ Р С•РЎР‚Р С–Р В°Р Р…РЎвЂ“Р В·Р В°РЎвЂ РЎвЂ“РЎвЂ” Р С•Р В±'РЎвЂќР Т‘Р Р…Р В°Р В»Р С‘ Р В·РЎС“РЎРѓР С‘Р В»Р В»РЎРЏ Р Т‘Р В»РЎРЏ РЎРѓРЎвЂљР Р†Р С•РЎР‚Р ВµР Р…Р Р…РЎРЏ Р С—Р С•РЎвЂљРЎС“Р В¶Р Р…Р С•РЎвЂ” Р С–РЎС“Р СР В°Р Р…РЎвЂ“РЎвЂљР В°РЎР‚Р Р…Р С•РЎвЂ” Р С—Р В»Р В°РЎвЂљРЎвЂћР С•РЎР‚Р СР С‘",
    },
    projects: {
      eyebrow: "Р СњР В°РЎв‚¬РЎвЂ“ Р С—РЎР‚Р С•РЎвЂќР С”РЎвЂљР С‘",
      title: "Р СџРЎР‚Р С•РЎвЂќР С”РЎвЂљР С‘, РЎвЂ°Р С• Р В·Р СРЎвЂ“Р Р…РЎР‹РЎР‹РЎвЂљРЎРЉ Р В¶Р С‘РЎвЂљРЎвЂљРЎРЏ",
      lead: "Р СљР С‘ РЎР‚Р ВµР В°Р В»РЎвЂ“Р В·РЎС“РЎвЂќР СР С• РЎвЂ“Р Р…РЎвЂ“РЎвЂ РЎвЂ“Р В°РЎвЂљР С‘Р Р†Р С‘, РЎРѓР С—РЎР‚РЎРЏР СР С•Р Р†Р В°Р Р…РЎвЂ“ Р Р…Р В° Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”РЎС“ Р Р†РЎвЂ“Р в„–РЎРѓРЎРЉР С”Р С•Р Р†Р С‘РЎвЂ¦, Р Т‘Р С•Р С—Р С•Р СР С•Р С–РЎС“ Р С—Р С•РЎРѓРЎвЂљРЎР‚Р В°Р В¶Р Т‘Р В°Р В»Р С‘Р С РЎвЂљР В° РЎРѓРЎвЂљР Р†Р С•РЎР‚Р ВµР Р…Р Р…РЎРЏ РЎРѓРЎС“РЎвЂЎР В°РЎРѓР Р…Р С•РЎвЂ” РЎРѓР С‘РЎРѓРЎвЂљР ВµР СР С‘ РЎР‚Р ВµР В°Р В±РЎвЂ“Р В»РЎвЂ“РЎвЂљР В°РЎвЂ РЎвЂ“РЎвЂ”.",
      leadSecond: "Р С™Р С•Р В¶Р ВµР Р… Р С—РЎР‚Р С•РЎвЂќР С”РЎвЂљ РІР‚вЂќ РЎвЂ Р Вµ Р Р†Р Р…Р ВµРЎРѓР С•Р С” РЎС“ РЎРѓР С‘Р В»РЎРЉР Р…РЎвЂ“РЎв‚¬Р Вµ Р СР В°Р в„–Р В±РЎС“РЎвЂљР Р…РЎвЂќ Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…Р С‘",
      supportTitle: "Р СџРЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р В° Р В·Р В°РЎвЂ¦Р С‘РЎРѓР Р…Р С‘Р С”РЎвЂ“Р Р†",
      medevacTitle: "Р СџРЎР‚Р С•РЎвЂќР С”РЎвЂљ MEDEVAC: Р Т‘Р С•РЎР‚Р С•Р С–Р В° Р В¶Р С‘РЎвЂљРЎвЂљРЎРЏ",
      medevacText: "Р СљР С‘ Р Р…Р Вµ Р С—РЎР‚Р С•РЎРѓРЎвЂљР С• Р С—Р ВµРЎР‚Р ВµР Р†Р С•Р В·Р С‘Р СР С• Р С—Р С•РЎР‚Р В°Р Р…Р ВµР Р…Р С‘РЎвЂ¦, Р СР С‘ Р Р†РЎвЂ“Р Т‘Р Р†Р С•Р в„–Р С•Р Р†РЎС“РЎвЂќР СР С• Р В¶Р С‘РЎвЂљРЎвЂљРЎРЏ РЎС“ РЎРѓР СР ВµРЎР‚РЎвЂљРЎвЂ“. Р вЂўР С”РЎвЂ“Р С—Р В°Р В¶РЎвЂ“ Р Т‘Р С•Р В±РЎР‚Р С•Р Р†Р С•Р В»РЎРЉРЎвЂ РЎвЂ“Р Р† РЎвЂ°Р С•Р Т‘Р Р…РЎРЏ Р Т‘Р С•Р В»Р В°РЎР‹РЎвЂљРЎРЉ РЎРѓР С•РЎвЂљР Р…РЎвЂ“ Р С”РЎвЂ“Р В»Р С•Р СР ВµРЎвЂљРЎР‚РЎвЂ“Р Р† Р С—РЎвЂ“Р Т‘ Р В·Р В°Р С–РЎР‚Р С•Р В·Р С•РЎР‹ Р С•Р В±РЎРѓРЎвЂљРЎР‚РЎвЂ“Р В»РЎвЂ“Р Р† РЎвЂљР В° Р Т‘РЎР‚Р С•Р Р…РЎвЂ“Р Р†, РЎвЂ°Р С•Р В± Р Т‘Р С•РЎРѓРЎвЂљР В°Р Р†Р С‘РЎвЂљР С‘ РЎС“Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎРѓРЎРЉР С”Р С‘РЎвЂ¦ Р В·Р В°РЎвЂ¦Р С‘РЎРѓР Р…Р С‘Р С”РЎвЂ“Р Р† Р В·РЎвЂ“ РЎРѓРЎвЂљР В°Р В±РЎвЂ“Р В»РЎвЂ“Р В·Р В°РЎвЂ РЎвЂ“Р в„–Р Р…Р С‘РЎвЂ¦ Р С—РЎС“Р Р…Р С”РЎвЂљРЎвЂ“Р Р† Р Т‘Р С• Р В»РЎвЂ“Р С”Р В°РЎР‚Р ВµР Р…РЎРЉ.",
      medevacTextSecond: "Р вЂ“Р С•Р Т‘Р Р…Р С‘РЎвЂ¦ Р В°Р Т‘Р СРЎвЂ“Р Р…РЎвЂ“РЎРѓРЎвЂљРЎР‚Р В°РЎвЂљР С‘Р Р†Р Р…Р С‘РЎвЂ¦ Р Р†Р С‘РЎвЂљРЎР‚Р В°РЎвЂљ РІР‚вЂќ 100% Р С—Р С•Р В¶Р ВµРЎР‚РЎвЂљР Р† Р в„–Р Т‘РЎС“РЎвЂљРЎРЉ Р Р…Р В° Р С—Р В°Р В»РЎРЉР Р…Р Вµ РЎвЂљР В° Р В·Р В°Р В±Р ВµР В·Р С—Р ВµРЎвЂЎР ВµР Р…Р Р…РЎРЏ Р СРЎвЂ“РЎРѓРЎвЂ“Р в„–",
      donationTitle: "Р С™Р С•Р В¶Р ВµР Р… Р Р†Р В°РЎв‚¬ Р Т‘Р С•Р Р…Р В°РЎвЂљ - РЎвЂ Р Вµ РЎвЂЎР С‘Р в„–РЎРѓРЎРЉ РЎв‚¬Р В°Р Р…РЎРѓ Р С—Р С•Р Р†Р ВµРЎР‚Р Р…РЎС“РЎвЂљР С‘РЎРѓРЎРЏ Р Т‘Р С•Р Т‘Р С•Р СРЎС“",
      rehabTitle: "Р СџР С•Р В±РЎС“Р Т‘Р С•Р Р†Р В° Р СР ВµРЎР‚Р ВµР В¶РЎвЂ“ РЎР‚Р ВµР В°Р В±РЎвЂ“Р В»РЎвЂ“РЎвЂљР В°РЎвЂ РЎвЂ“Р в„–Р Р…Р С‘РЎвЂ¦ РЎвЂ Р ВµР Р…РЎвЂљРЎР‚РЎвЂ“Р Р†",
      rehabText: "Р РЋРЎвЂљР Р†Р С•РЎР‚РЎР‹РЎвЂќР СР С• РЎРѓРЎС“РЎвЂЎР В°РЎРѓР Р…РЎС“ Р СР ВµРЎР‚Р ВµР В¶РЎС“ РЎР‚Р ВµР В°Р В±РЎвЂ“Р В»РЎвЂ“РЎвЂљР В°РЎвЂ РЎвЂ“Р в„–Р Р…Р С‘РЎвЂ¦ РЎвЂ Р ВµР Р…РЎвЂљРЎР‚РЎвЂ“Р Р†, РЎвЂ°Р С• Р В·Р В°Р В±Р ВµР В·Р С—Р ВµРЎвЂЎР С‘РЎвЂљРЎРЉ Р С”Р С•Р СР С—Р В»Р ВµР С”РЎРѓР Р…Р Вµ РЎвЂћРЎвЂ“Р В·Р С‘РЎвЂЎР Р…Р Вµ, Р С—РЎРѓР С‘РЎвЂ¦Р С•Р В»Р С•Р С–РЎвЂ“РЎвЂЎР Р…Р Вµ РЎвЂљР В° РЎРѓР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…Р Вµ Р Р†РЎвЂ“Р Т‘Р Р…Р С•Р Р†Р В»Р ВµР Р…Р Р…РЎРЏ Р Р†РЎвЂ“Р в„–РЎРѓРЎРЉР С”Р С•Р Р†Р С‘РЎвЂ¦ РЎвЂ“ РЎвЂ Р С‘Р Р†РЎвЂ“Р В»РЎРЉР Р…Р С‘РЎвЂ¦",
    },
    contacts: {
      eyebrow: "Р С™Р С•Р Р…РЎвЂљР В°Р С”РЎвЂљР С‘ РЎвЂљР В° Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р В°",
      title: "Р вЂ”Р Р†'РЎРЏР В¶РЎвЂ“РЎвЂљРЎРЉРЎРѓРЎРЏ Р В· Р Р…Р В°Р СР С‘ Р В°Р В±Р С• Р С•Р В±Р ВµРЎР‚РЎвЂ“РЎвЂљРЎРЉ РЎРѓР С—Р С•РЎРѓРЎвЂ“Р В± Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р С‘ Р Р…Р В°РЎв‚¬Р С•РЎвЂ” Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…Р С•РЎРѓРЎвЂљРЎвЂ“",
      lead: "Р СљР С‘ Р Р†РЎвЂ“Р Т‘Р С”РЎР‚Р С‘РЎвЂљРЎвЂ“ Р Т‘Р С• РЎРѓР С—РЎвЂ“Р Р†Р С—РЎР‚Р В°РЎвЂ РЎвЂ“, Р С—Р В°РЎР‚РЎвЂљР Р…Р ВµРЎР‚РЎРѓРЎвЂљР Р†Р В° РЎвЂљР В° Р Р…Р С•Р Р†Р С‘РЎвЂ¦ РЎвЂ“Р Р…РЎвЂ“РЎвЂ РЎвЂ“Р В°РЎвЂљР С‘Р Р†. Р В Р В°Р В·Р С•Р С Р СР С‘ РЎР‚Р С•Р В±Р С‘Р СР С• Р В±РЎвЂ“Р В»РЎРЉРЎв‚¬Р Вµ Р Т‘Р В»РЎРЏ Р В»РЎР‹Р Т‘Р ВµР в„– РЎвЂ“ Р СР В°Р в„–Р В±РЎС“РЎвЂљР Р…РЎРЉР С•Р С–Р С• Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…Р С‘.",
      helpTitle: "Р Р‡Р С” Р Р†Р С‘ Р СР С•Р В¶Р ВµРЎвЂљР Вµ Р Т‘Р С•Р С—Р С•Р СР С•Р С–РЎвЂљР С‘",
      infoTitle: "Р вЂќР С•Р В»РЎС“РЎвЂЎР В°Р в„–РЎвЂљР ВµРЎРѓРЎРЏ Р Т‘Р С• РЎРѓРЎвЂљР Р†Р С•РЎР‚Р ВµР Р…Р Р…РЎРЏ Р В·Р СРЎвЂ“Р Р…, РЎРЏР С”РЎвЂ“ Р СР В°РЎР‹РЎвЂљРЎРЉ Р В·Р Р…Р В°РЎвЂЎР ВµР Р…Р Р…РЎРЏ",
      contactInfo: "Р С™Р С•Р Р…РЎвЂљР В°Р С”РЎвЂљР Р…Р В° РЎвЂ“Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ РЎвЂ“РЎРЏ",
      phone: "Р СћР ВµР В»Р ВµРЎвЂћР С•Р Р…",
      social: "Р СљР С‘ Р Р† РЎРѓР С•РЎвЂ Р СР ВµРЎР‚Р ВµР В¶Р В°РЎвЂ¦",
      formTitle: "Р СњР В°Р Т‘РЎвЂ“РЎРѓР В»Р В°РЎвЂљР С‘ Р С—Р С•Р Р†РЎвЂ“Р Т‘Р С•Р СР В»Р ВµР Р…Р Р…РЎРЏ",
      name: "Р вЂ™Р В°РЎв‚¬Р Вµ РЎвЂ“Р С'РЎРЏ",
      email: "Р вЂ™Р В°РЎв‚¬ email",
      topic: "Р СћР ВµР СР В° Р С—Р С•Р Р†РЎвЂ“Р Т‘Р С•Р СР В»Р ВµР Р…Р Р…РЎРЏ",
      message: "Р вЂ™Р В°РЎв‚¬Р Вµ Р С—Р С•Р Р†РЎвЂ“Р Т‘Р С•Р СР В»Р ВµР Р…Р Р…РЎРЏ",
      consent: "Р Р‡ Р С—Р С•Р С–Р С•Р Т‘Р В¶РЎС“РЎР‹РЎРѓРЎРЏ Р Р…Р В° Р С•Р В±РЎР‚Р С•Р В±Р С”РЎС“ Р С—Р ВµРЎР‚РЎРѓР С•Р Р…Р В°Р В»РЎРЉР Р…Р С‘РЎвЂ¦ Р Т‘Р В°Р Р…Р С‘РЎвЂ¦ РЎвЂљР В° Р Р…Р В°Р Т‘Р В°РЎР‹ Р В·Р С–Р С•Р Т‘РЎС“ Р Р…Р В° Р В·Р Р†Р С•РЎР‚Р С•РЎвЂљР Р…РЎвЂ“Р в„– Р В·Р Р†'РЎРЏР В·Р С•Р С” РЎвЂ°Р С•Р Т‘Р С• Р СР С•РЎвЂќРЎвЂ” Р В·Р В°РЎРЏР Р†Р С”Р С‘",
      submit: "Р СњР В°Р Т‘РЎвЂ“РЎРѓР В»Р В°РЎвЂљР С‘ Р С—Р С•Р Р†РЎвЂ“Р Т‘Р С•Р СР В»Р ВµР Р…Р Р…РЎРЏ",
    },
    footer: {
      rights: "Р’В© 2025 Power of the Nation Humanitarian Alliance. Р вЂ™РЎРѓРЎвЂ“ Р С—РЎР‚Р В°Р Р†Р В° Р В·Р В°РЎвЂ¦Р С‘РЎвЂ°Р ВµР Р…РЎвЂ“.",
      org: "Р вЂњРЎР‚Р С•Р СР В°Р Т‘РЎРѓРЎРЉР С”Р В° РЎРѓР С—РЎвЂ“Р В»Р С”Р В° Р’В«Р РЋР С‘Р В»Р В° Р СњР В°РЎвЂ РЎвЂ“Р в„– Р вЂњРЎС“Р СР В°Р Р…РЎвЂ“РЎвЂљР В°РЎР‚Р Р…Р С‘Р в„– Р С’Р В»РЎРЉРЎРЏР Р…РЎРѓР’В»",
      made: "Р РЋРЎвЂљР Р†Р С•РЎР‚Р ВµР Р…Р С• Р В·",
      madeTail: "Р Т‘Р В»РЎРЏ Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…Р С‘",
    },
    aria: {
      mainNav: "Р С›РЎРѓР Р…Р С•Р Р†Р Р…Р В° Р Р…Р В°Р Р†РЎвЂ“Р С–Р В°РЎвЂ РЎвЂ“РЎРЏ",
      footerNav: "Р СњР В°Р Р†РЎвЂ“Р С–Р В°РЎвЂ РЎвЂ“РЎРЏ РЎвЂћРЎС“РЎвЂљР ВµРЎР‚Р В°",
      language: "Р СџР ВµРЎР‚Р ВµР СР С”Р Р…РЎС“РЎвЂљР С‘ Р СР С•Р Р†РЎС“",
      openMenu: "Р вЂ™РЎвЂ“Р Т‘Р С”РЎР‚Р С‘РЎвЂљР С‘ Р СР ВµР Р…РЎР‹",
      closeMenu: "Р вЂ”Р В°Р С”РЎР‚Р С‘РЎвЂљР С‘ Р СР ВµР Р…РЎР‹",
      mobileLanguage: "Р СџР ВµРЎР‚Р ВµР СР С‘Р С”Р В°РЎвЂЎ Р СР С•Р Р†Р С‘",
      mobileNav: "Р СљР С•Р В±РЎвЂ“Р В»РЎРЉР Р…Р В° Р Р…Р В°Р Р†РЎвЂ“Р С–Р В°РЎвЂ РЎвЂ“РЎРЏ",
      previousDirections: "Р СџР С•Р С—Р ВµРЎР‚Р ВµР Т‘Р Р…РЎвЂ“ Р Р…Р В°Р С—РЎР‚РЎРЏР СР С”Р С‘",
      nextDirections: "Р СњР В°РЎРѓРЎвЂљРЎС“Р С—Р Р…РЎвЂ“ Р Р…Р В°Р С—РЎР‚РЎРЏР СР С”Р С‘",
      previousProjects: "Р СџР С•Р С—Р ВµРЎР‚Р ВµР Т‘Р Р…РЎвЂ“ Р С—РЎР‚Р С•РЎвЂќР С”РЎвЂљР С‘",
      nextProjects: "Р СњР В°РЎРѓРЎвЂљРЎС“Р С—Р Р…РЎвЂ“ Р С—РЎР‚Р С•РЎвЂќР С”РЎвЂљР С‘",
      closeCard: "Р вЂ”Р В°Р С”РЎР‚Р С‘РЎвЂљР С‘ Р С”Р В°РЎР‚РЎвЂљР С”РЎС“",
    },
  },
  en: {
    nav: {
      home: "Home",
      directions: "Areas",
      founders: "Founders",
      projects: "Projects",
      contacts: "Contacts",
    },
    support: "Support",
    partner: "Become a partner",
    learnMore: "Learn more",
    join: "Join",
    hero: {
      eyebrow: "Power of nations. Humanitarian alliance",
      title: "Power of the Nation - Humanitarian Alliance",
      lead: "A non-governmental alliance dedicated to implementing high-impact social initiatives, supporting communities, and fostering civil society development.",
    },
    directions: {
      eyebrow: "Areas",
      title: "Core Focus Areas",
    },
    founders: {
      eyebrow: "Our founders",
      title: "United by a common goal: to serve the people and Ukraine.",
      lead: "Three organizations have joined forces to create a powerful, coordinated humanitarian platform.",
    },
    projects: {
      eyebrow: "Our projects",
      title: "Projects That Change Lives",
      lead: "We implement initiatives aimed at supporting the military, aiding those affected by the war, and creating a modern rehabilitation system.",
      leadSecond: "Every project is a contribution to a stronger future for Ukraine.",
      supportTitle: "Support for the Armed Forces of Ukraine",
      medevacTitle: "Project MEDEVAC: The Road of Life",
      medevacText: "We don't just transport the wounded; we reclaim lives from the brink of death. Every day, volunteer crews cover hundreds of kilometers under the constant threat of shelling and drone attacks to safely transport Ukrainian defenders from frontline stabilization points to hospitals.",
      medevacTextSecond: "Zero administrative costs: 100% of your donations go directly to fuel and mission support.",
      donationTitle: "Every donation is someone's chance to return home.",
      rehabTitle: "Building a Network of Rehabilitation Centers",
      rehabText: "We are establishing a modern network of rehabilitation centers to provide comprehensive physical, psychological, and social recovery for both military personnel and civilians.",
    },
    contacts: {
      eyebrow: "Contacts and support",
      title: "Contact us or choose a way to support our joint mission.",
      lead: "We welcome strategic cooperation, institutional partnerships, and joint initiatives. Together, we can achieve a greater impact for the people and the future of Ukraine.",
      helpTitle: "How You Can Help",
      infoTitle: "Join us in making a meaningful impact.",
      contactInfo: "Contact Information",
      phone: "Phone",
      social: "Social Media",
      formTitle: "Send a Message",
      name: "Your Name",
      email: "Your Email",
      topic: "Subject",
      message: "Your Message",
      consent: "I consent to the processing of my personal data and agree to be contacted regarding my inquiry in accordance with the Privacy Policy.",
      submit: "Send a Message",
    },
    footer: {
      rights: "Р’В© 2025 Power of the Nation Humanitarian Alliance. All rights reserved.",
      org: "Civic union РІР‚СљPower of Nations Humanitarian AllianceРІР‚Сњ",
      made: "Created with",
      madeTail: "for Ukraine",
    },
    aria: {
      mainNav: "Main navigation",
      footerNav: "Footer navigation",
      language: "Switch language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mobileLanguage: "Language switcher",
      mobileNav: "Mobile navigation",
      previousDirections: "Previous areas",
      nextDirections: "Next areas",
      previousProjects: "Previous projects",
      nextProjects: "Next projects",
      closeCard: "Close card",
    },
  },
} satisfies Record<Language, Record<string, unknown>>;

const directions = [
  "Р СџРЎРѓР С‘РЎвЂ¦Р С•Р В»Р С•Р С–РЎвЂ“РЎвЂЎР Р…Р В° Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р В°",
  "Р С›РЎРѓР Р†РЎвЂ“РЎвЂљР Р…РЎРЏ Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ",
  "Р С’Р Т‘Р Р†Р С•Р С”Р В°РЎвЂљРЎРѓРЎРЉР С”Р В° Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ",
  "Р РЋР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…Р В° Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ",
  "Р РЋР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…Р Вµ Р С—РЎвЂ“Р Т‘Р С—РЎР‚Р С‘РЎвЂќР СРЎРѓРЎвЂљР Р†Р С•",
  "Р вЂРЎС“Р Т‘РЎвЂ“Р Р†Р Р…Р С‘РЎвЂ РЎвЂљР Р†Р С• РЎвЂљР В° РЎвЂљР ВµРЎвЂ¦Р Р…РЎвЂ“РЎвЂЎР Р…РЎвЂ“ РЎР‚Р С•Р В±Р С•РЎвЂљР С‘",
  "Р С™РЎС“Р В»РЎРЉРЎвЂљРЎС“РЎР‚Р Р…Р В° Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ",
  "Р вЂўР С”Р С•Р В»Р С•Р С–РЎвЂ“РЎвЂЎР Р…Р В° Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ",
  "Р СљРЎвЂ“Р В¶Р Р…Р В°РЎР‚Р С•Р Т‘Р Р…Р В° Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ",
  "Р СљР ВµР Т‘Р С‘РЎвЂЎР Р…Р В° РЎвЂљР В° РЎР‚Р ВµР В°Р В±РЎвЂ“Р В»РЎвЂ“РЎвЂљР В°РЎвЂ РЎвЂ“Р в„–Р Р…Р В° Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ",
  "Р СљР В°Р в„–Р Р…Р С•Р Р†Р В°, РЎвЂћРЎвЂ“Р Р…Р В°Р Р…РЎРѓР С•Р Р†Р В° РЎвЂљР В° РЎвЂ“Р Р…Р Р†Р ВµРЎРѓРЎвЂљР С‘РЎвЂ РЎвЂ“Р в„–Р Р…Р В° Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ",
  "Р вЂ™РЎв‚¬Р В°Р Р…РЎС“Р Р†Р В°Р Р…Р Р…РЎРЏ Р С—Р В°Р С'РЎРЏРЎвЂљРЎвЂ“ РЎвЂљР В° Р СР ВµР СР С•РЎР‚РЎвЂ“Р В°Р В»РЎвЂ“Р В·Р В°РЎвЂ РЎвЂ“РЎРЏ",
];

const directionIcons = [
  "/direction-icons/01.png",
  "/direction-icons/02.png",
  "/direction-icons/03.png",
  "/direction-icons/04.png",
  "/direction-icons/05.png",
  "/direction-icons/06.png",
  "/direction-icons/07.png",
  "/direction-icons/08.png",
  "/direction-icons/09.png",
  "/direction-icons/10.png",
  "/direction-icons/11.png",
  "/direction-icons/12.png",
];

const directionIconsEn = [
  "/direction-icons/01.png",
  "/direction-icons/02.png",
  "/direction-icons/03.png",
  "/direction-icons/04.png",
  "/direction-icons/05.png",
  "/direction-icons/06.png",
  "/direction-icons/07.png",
  "/direction-icons/08.png",
  "/direction-icons/09.png",
  "/direction-icons/10.png",
  "/direction-icons/11.png",
  "/direction-icons/12.png",
];

const directionDetails = [
  "Р СњР В°Р Т‘Р В°Р Р…Р Р…РЎРЏ Р С—РЎРѓР С‘РЎвЂ¦Р С•Р В»Р С•Р С–РЎвЂ“РЎвЂЎР Р…Р С•РЎвЂ” Р Т‘Р С•Р С—Р С•Р СР С•Р С–Р С‘, Р С”РЎР‚Р С‘Р В·Р С•Р Р†Р В° Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р В°, Р С–РЎР‚РЎС“Р С—Р С‘ Р Р†Р В·Р В°РЎвЂќР СР С•Р Т‘Р С•Р С—Р С•Р СР С•Р С–Р С‘, Р С—РЎРѓР С‘РЎвЂ¦Р С•Р С•РЎРѓР Р†РЎвЂ“РЎвЂљР Р…РЎРЏ Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ",
  "Р В Р С•Р В·РЎР‚Р С•Р В±Р С”Р В° Р С•РЎРѓР Р†РЎвЂ“РЎвЂљР Р…РЎвЂ“РЎвЂ¦ Р С—РЎР‚Р С•Р С–РЎР‚Р В°Р С, РЎРѓР ВµР СРЎвЂ“Р Р…Р В°РЎР‚Р С‘ РЎвЂљР В° РЎвЂљРЎР‚Р ВµР Р…РЎвЂ“Р Р…Р С–Р С‘, РЎвЂ“Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ РЎвЂ“Р в„–Р Р…Р С•-Р С—РЎР‚Р С•РЎРѓР Р†РЎвЂ“РЎвЂљР Р…Р С‘РЎвЂ РЎРЉР С”Р В° РЎР‚Р С•Р В±Р С•РЎвЂљР В°",
  "Р СџРЎР‚Р В°Р Р†Р С•Р Р†Р С‘Р в„– Р В·Р В°РЎвЂ¦Р С‘РЎРѓРЎвЂљ, Р С—РЎР‚Р В°Р Р†Р С•Р С—РЎР‚Р С•РЎРѓР Р†РЎвЂ“РЎвЂљР Р…Р С‘РЎвЂ РЎРЉР С”Р В° Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ, Р С—РЎР‚Р ВµР Т‘РЎРѓРЎвЂљР В°Р Р†Р Р…Р С‘РЎвЂ РЎвЂљР Р†Р С• РЎвЂ“Р Р…РЎвЂљР ВµРЎР‚Р ВµРЎРѓРЎвЂ“Р Р†",
  "Р РЋР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…Р В° Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р В°, Р В·Р В°РЎвЂ¦Р С‘РЎРѓРЎвЂљ Р С—РЎР‚Р В°Р Р†, РЎРѓР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…Р В° Р В°Р Т‘Р В°Р С—РЎвЂљР В°РЎвЂ РЎвЂ“РЎРЏ РЎвЂљР В° РЎР‚Р ВµРЎвЂ“Р Р…РЎвЂљР ВµР С–РЎР‚Р В°РЎвЂ РЎвЂ“РЎРЏ",
  "Р СџРЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р В° Р В·Р В°Р в„–Р Р…РЎРЏРЎвЂљР С•РЎРѓРЎвЂљРЎвЂ“, РЎР‚Р С•Р В·Р Р†Р С‘РЎвЂљР С•Р С” РЎРѓР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…Р С‘РЎвЂ¦ Р С—РЎвЂ“Р Т‘Р С—РЎР‚Р С‘РЎвЂќР СРЎРѓРЎвЂљР Р†, Р Р…Р В°Р Р†РЎвЂЎР В°Р Р…Р Р…РЎРЏ Р С”Р С•Р СР С—Р ВµРЎвЂљР ВµР Р…РЎвЂ РЎвЂ“РЎРЏР С",
  "Р вЂ™РЎвЂ“Р Т‘Р Р…Р С•Р Р†Р В»Р ВµР Р…Р Р…РЎРЏ Р С•Р В±'РЎвЂќР С”РЎвЂљРЎвЂ“Р Р†, РЎР‚Р ВµР СР С•Р Р…РЎвЂљР Р…РЎвЂ“ РЎР‚Р С•Р В±Р С•РЎвЂљР С‘, РЎвЂљР ВµРЎвЂ¦Р Р…РЎвЂ“РЎвЂЎР Р…Р Вµ Р С•Р В±РЎРѓР В»РЎС“Р С–Р С•Р Р†РЎС“Р Р†Р В°Р Р…Р Р…РЎРЏ РЎвЂ“Р Р…РЎвЂћРЎР‚Р В°РЎРѓРЎвЂљРЎР‚РЎС“Р С”РЎвЂљРЎС“РЎР‚Р С‘",
  "Р вЂ”Р В±Р ВµРЎР‚Р ВµР В¶Р ВµР Р…Р Р…РЎРЏ Р С”РЎС“Р В»РЎРЉРЎвЂљРЎС“РЎР‚Р Р…Р С•РЎвЂ” РЎРѓР С—Р В°Р Т‘РЎвЂ°Р С‘Р Р…Р С‘, Р С•РЎР‚Р С–Р В°Р Р…РЎвЂ“Р В·Р В°РЎвЂ РЎвЂ“РЎРЏ Р В·Р В°РЎвЂ¦Р С•Р Т‘РЎвЂ“Р Р†, Р СРЎвЂ“Р В¶Р С”РЎС“Р В»РЎРЉРЎвЂљРЎС“РЎР‚Р Р…Р С‘Р в„– Р Т‘РЎвЂ“Р В°Р В»Р С•Р С–",
  "Р С›РЎвЂ¦Р С•РЎР‚Р С•Р Р…Р В° Р Т‘Р С•Р Р†Р С”РЎвЂ“Р В»Р В»РЎРЏ, Р ВµР С”Р С•Р В»Р С•Р С–РЎвЂ“РЎвЂЎР Р…Р В° Р С•РЎРѓР Р†РЎвЂ“РЎвЂљР В°, РЎРѓРЎвЂљР В°Р В»Р Вµ Р Р†Р С‘Р С”Р С•РЎР‚Р С‘РЎРѓРЎвЂљР В°Р Р…Р Р…РЎРЏ РЎР‚Р ВµРЎРѓРЎС“РЎР‚РЎРѓРЎвЂ“Р Р†",
  "Р СљРЎвЂ“Р В¶Р Р…Р В°РЎР‚Р С•Р Т‘Р Р…Р Вµ Р С—Р В°РЎР‚РЎвЂљР Р…Р ВµРЎР‚РЎРѓРЎвЂљР Р†Р С•, Р В·Р В°Р В»РЎС“РЎвЂЎР ВµР Р…Р Р…РЎРЏ РЎвЂћРЎвЂ“Р Р…Р В°Р Р…РЎРѓРЎС“Р Р†Р В°Р Р…Р Р…РЎРЏ, Р С•Р В±Р СРЎвЂ“Р Р… Р Т‘Р С•РЎРѓР Р†РЎвЂ“Р Т‘Р С•Р С",
  "Р РЋР С—РЎР‚Р С‘РЎРЏР Р…Р Р…РЎРЏ Р СР ВµР Т‘Р С‘РЎвЂЎР Р…РЎвЂ“Р в„– Р Т‘Р С•Р С—Р С•Р СР С•Р В·РЎвЂ“, РЎР‚Р ВµР В°Р В±РЎвЂ“Р В»РЎвЂ“РЎвЂљР В°РЎвЂ РЎвЂ“РЎРЏ, Р С—РЎРѓР С‘РЎвЂ¦Р С•РЎРѓР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…Р В° Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р В°",
  "Р Р€Р С—РЎР‚Р В°Р Р†Р В»РЎвЂ“Р Р…Р Р…РЎРЏ РЎР‚Р ВµРЎРѓРЎС“РЎР‚РЎРѓР В°Р СР С‘, РЎвЂ“Р Р…Р Р†Р ВµРЎРѓРЎвЂљР С‘РЎвЂ РЎвЂ“Р в„–Р Р…Р В° Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ, Р Т‘Р С•Р Р…Р С•РЎР‚РЎРѓРЎРЉР С”РЎвЂ“ Р С—РЎР‚Р С•Р С–РЎР‚Р В°Р СР С‘",
  "Р РЋРЎвЂљР Р†Р С•РЎР‚Р ВµР Р…Р Р…РЎРЏ Р СР ВµР СР С•РЎР‚РЎвЂ“Р В°Р В»РЎвЂ“Р Р† Р Р…Р В° РЎвЂЎР ВµРЎРѓРЎвЂљРЎРЉ Р С—Р С•Р В»Р ВµР С–Р В»Р С‘РЎвЂ¦ РЎвЂ“Р Р…Р С•Р В·Р ВµР СР Р…Р С‘РЎвЂ¦ Р Т‘Р С•Р В±РЎР‚Р С•Р Р†Р С•Р В»РЎРЉРЎвЂ РЎвЂ“Р Р†, РЎР‚Р ВµР В°Р В»РЎвЂ“Р В·Р В°РЎвЂ РЎвЂ“РЎРЏ Р СР ВµР СР С•РЎР‚РЎвЂ“Р В°Р В»РЎРЉР Р…Р С‘РЎвЂ¦ РЎвЂ“Р Р…РЎвЂ“РЎвЂ РЎвЂ“Р В°РЎвЂљР С‘Р Р†, Р В° РЎвЂљР В°Р С”Р С•Р В¶ РЎРѓР С—РЎР‚Р С‘РЎРЏР Р…Р Р…РЎРЏ Р СРЎвЂ“Р В¶Р Р…Р В°РЎР‚Р С•Р Т‘Р Р…РЎвЂ“Р в„– РЎРѓР С•Р В»РЎвЂ“Р Т‘Р В°РЎР‚Р Р…Р С•РЎРѓРЎвЂљРЎвЂ“ РЎвЂљР В° Р СР С•Р В»Р С•Р Т‘РЎвЂ“Р В¶Р Р…РЎвЂ“Р в„– Р С•РЎРѓР Р†РЎвЂ“РЎвЂљРЎвЂ“",
];

const directionMobileDetails: Partial<Record<number, string>> = {
  11: "Р СљР ВµР СР С•РЎР‚РЎвЂ“Р В°Р В»Р С‘ Р Т‘Р В»РЎРЏ Р С—Р С•Р В»Р ВµР С–Р В»Р С‘РЎвЂ¦ РЎвЂ“Р Р…Р С•Р В·Р ВµР СР Р…Р С‘РЎвЂ¦ Р Т‘Р С•Р В±РЎР‚Р С•Р Р†Р С•Р В»РЎРЉРЎвЂ РЎвЂ“Р Р† РЎвЂљР В° РЎвЂ“Р Р…РЎвЂ“РЎвЂ РЎвЂ“Р В°РЎвЂљР С‘Р Р†Р С‘ Р С—Р В°Р СРІР‚в„ўРЎРЏРЎвЂљРЎвЂ“.",
};

const founders = [
  {
    country: "Р вЂєР В°РЎвЂљР Р†РЎвЂ“РЎРЏ",
    title: "Ganta Fonds",
    text: "Р вЂєР В°РЎвЂљР Р†РЎвЂ“Р в„–РЎРѓРЎРЉР С”Р С‘Р в„– Р В±Р В»Р В°Р С–Р С•Р Т‘РЎвЂ“Р в„–Р Р…Р С‘Р в„– РЎвЂћР С•Р Р…Р Т‘, РЎвЂ°Р С• РЎРѓРЎвЂљР Р†Р С•РЎР‚РЎР‹РЎвЂќ Р Р…Р В°РЎвЂ РЎвЂ“Р С•Р Р…Р В°Р В»РЎРЉР Р…РЎвЂ“ РЎвЂљР В° Р СРЎвЂ“Р В¶Р Р…Р В°РЎР‚Р С•Р Т‘Р Р…РЎвЂ“ Р С–РЎС“Р СР В°Р Р…РЎвЂ“РЎвЂљР В°РЎР‚Р Р…РЎвЂ“ Р С—РЎР‚Р С•РЎвЂќР С”РЎвЂљР С‘. Р РЋР С—Р ВµРЎвЂ РЎвЂ“Р В°Р В»РЎвЂ“Р В·РЎС“РЎвЂќРЎвЂљРЎРЉРЎРѓРЎРЏ Р Р…Р В° Р СР С•Р В±РЎвЂ“Р В»РЎРЉР Р…РЎвЂ“Р в„– Р СР ВµР Т‘Р С‘РЎвЂЎР Р…РЎвЂ“Р в„– Р Т‘Р С•Р С—Р С•Р СР С•Р В·РЎвЂ“, Р ВµР Р†Р В°Р С”РЎС“Р В°РЎвЂ РЎвЂ“РЎвЂ” Р С—Р С•РЎР‚Р В°Р Р…Р ВµР Р…Р С‘РЎвЂ¦ РЎвЂљР В° Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СРЎвЂ РЎвЂ“ РЎС“Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎРѓРЎРЉР С”Р С‘РЎвЂ¦ Р СР ВµР Т‘Р С‘Р С”РЎвЂ“Р Р† РЎвЂ“ Р Р†РЎвЂ“Р в„–РЎРѓРЎРЉР С”Р С•Р Р†Р С‘РЎвЂ¦.",
  },
  {
    country: "Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…Р В° - Р РЋР РЃР С’",
    title: "Р вЂњР С› Р’В«Р РЃР В»РЎРЏРЎвЂ¦ Р СџР В°Р С'РЎРЏРЎвЂљРЎвЂ“Р’В»",
    text: "Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎРѓРЎРЉР С”Р С•-Р В°Р СР ВµРЎР‚Р С‘Р С”Р В°Р Р…РЎРѓРЎРЉР С”Р В° Р С–РЎР‚Р С•Р СР В°Р Т‘РЎРѓРЎРЉР С”Р В° Р С•РЎР‚Р С–Р В°Р Р…РЎвЂ“Р В·Р В°РЎвЂ РЎвЂ“РЎРЏ, РЎвЂ°Р С• РЎРѓРЎвЂљР Р†Р С•РЎР‚РЎР‹РЎвЂќ Р СР ВµР СР С•РЎР‚РЎвЂ“Р В°Р В»Р С‘ РЎвЂ“Р Р…Р С•Р В·Р ВµР СР Р…Р С‘Р С Р Т‘Р С•Р В±РЎР‚Р С•Р Р†Р С•Р В»РЎРЉРЎвЂ РЎРЏР С, РЎРЏР С”РЎвЂ“ Р В·Р В°Р С–Р С‘Р Р…РЎС“Р В»Р С‘ Р В·Р В°РЎвЂ¦Р С‘РЎвЂ°Р В°РЎР‹РЎвЂЎР С‘ Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎС“. Р В Р ВµР В°Р В»РЎвЂ“Р В·РЎС“РЎвЂќ Р С—РЎР‚Р С•РЎвЂќР С”РЎвЂљР С‘ Р Р†РЎв‚¬Р В°Р Р…РЎС“Р Р†Р В°Р Р…Р Р…РЎРЏ Р С—Р В°Р СРІР‚в„ўРЎРЏРЎвЂљРЎвЂ“, РЎР‚Р С•Р В·Р Р†Р С‘РЎвЂљР С”РЎС“ РЎвЂљР ВµРЎР‚Р С‘РЎвЂљР С•РЎР‚РЎвЂ“Р в„–, Р СРЎвЂ“Р В¶Р Р…Р В°РЎР‚Р С•Р Т‘Р Р…Р С•РЎвЂ” РЎРѓР С•Р В»РЎвЂ“Р Т‘Р В°РЎР‚Р Р…Р С•РЎРѓРЎвЂљРЎвЂ“ РЎвЂљР В° Р С•РЎРѓР Р†РЎвЂ“РЎвЂљР С‘ Р СР С•Р В»Р С•Р Т‘РЎвЂ“.",
  },
  {
    country: "Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…Р В°",
    title: "Р вЂР С› РІР‚СљР вЂ™Р С•Р В»Р С•Р Р…РЎвЂљР ВµРЎР‚Р С‘ Р вЂР С•Р В»Р ВµРЎвЂ¦РЎвЂ“Р Р†РЎвЂ°Р С‘Р Р…Р С‘РІР‚Сњ",
    text: "Р вЂР В»Р В°Р С–Р С•Р Т‘РЎвЂ“Р в„–Р Р…Р В° Р С•РЎР‚Р С–Р В°Р Р…РЎвЂ“Р В·Р В°РЎвЂ РЎвЂ“РЎРЏ Р В· Р вЂ Р Р†Р В°Р Р…Р С•-Р В¤РЎР‚Р В°Р Р…Р С”РЎвЂ“Р Р†РЎРѓРЎРЉР С”Р С•РЎвЂ” Р С•Р В±Р В»Р В°РЎРѓРЎвЂљРЎвЂ“, РЎвЂ°Р С• Р Р…Р В°Р Т‘Р В°РЎвЂќ РЎРѓР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…РЎС“ РЎвЂљР В° Р С–РЎС“Р СР В°Р Р…РЎвЂ“РЎвЂљР В°РЎР‚Р Р…РЎС“ Р Т‘Р С•Р С—Р С•Р СР С•Р С–РЎС“ Р Р…Р В°РЎРѓР ВµР В»Р ВµР Р…Р Р…РЎР‹. Р С’Р С”РЎвЂљР С‘Р Р†Р Р…Р С• Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СРЎС“РЎвЂќ Р Р†РЎвЂ“Р в„–РЎРѓРЎРЉР С”Р С•Р Р†Р С‘РЎвЂ¦, Р В·Р В°Р в„–Р СР В°РЎвЂќРЎвЂљРЎРЉРЎРѓРЎРЏ Р Р†Р С•Р В»Р С•Р Р…РЎвЂљР ВµРЎР‚РЎРѓРЎРЉР С”Р С•РЎР‹ Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎР‹ РЎвЂљР В° РЎРѓР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…Р С‘Р СР С‘ Р С—РЎР‚Р С•РЎвЂќР С”РЎвЂљР В°Р СР С‘.",
  },
];

const stats = [
  ["03", "Р С™РЎР‚Р В°РЎвЂ”Р Р…Р С‘ - Р С—Р В°РЎР‚РЎвЂљР Р…Р ВµРЎР‚Р С‘"],
  ["12", "Р СњР В°Р С—РЎР‚РЎРЏР СР С”РЎвЂ“Р Р† Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…Р С•РЎРѓРЎвЂљРЎвЂ“"],
  ["1000+", "Р С›РЎвЂ¦Р С•Р С—Р В»Р ВµР Р…Р С‘РЎвЂ¦ Р С–РЎР‚Р С•Р СР В°Р Т‘РЎРЏР Р…"],
  ["24/7", "Р вЂњРЎС“Р СР В°Р Р…РЎвЂ“РЎвЂљР В°РЎР‚Р Р…Р В° Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р В°"],
];

const founderCards = [
  {
    align: "left",
    icon: "/founder-overlay-1.svg",
    country: "Р вЂєР В°РЎвЂљР Р†РЎвЂ“РЎРЏ",
    title: "Ganta Fonds",
    text: "Р вЂєР В°РЎвЂљР Р†РЎвЂ“Р в„–РЎРѓРЎРЉР С”Р С‘Р в„– Р В±Р В»Р В°Р С–Р С•Р Т‘РЎвЂ“Р в„–Р Р…Р С‘Р в„– РЎвЂћР С•Р Р…Р Т‘, РЎвЂ°Р С• РЎРѓРЎвЂљР Р†Р С•РЎР‚РЎР‹РЎвЂќ Р Р…Р В°РЎвЂ РЎвЂ“Р С•Р Р…Р В°Р В»РЎРЉР Р…РЎвЂ“ РЎвЂљР В° Р СРЎвЂ“Р В¶Р Р…Р В°РЎР‚Р С•Р Т‘Р Р…РЎвЂ“ Р С–РЎС“Р СР В°Р Р…РЎвЂ“РЎвЂљР В°РЎР‚Р Р…РЎвЂ“ Р С—РЎР‚Р С•РЎвЂќР С”РЎвЂљР С‘. Р РЋР С—Р ВµРЎвЂ РЎвЂ“Р В°Р В»РЎвЂ“Р В·РЎС“РЎвЂќРЎвЂљРЎРЉРЎРѓРЎРЏ Р Р…Р В° Р СР С•Р В±РЎвЂ“Р В»РЎРЉР Р…РЎвЂ“Р в„– Р СР ВµР Т‘Р С‘РЎвЂЎР Р…РЎвЂ“Р в„– Р Т‘Р С•Р С—Р С•Р СР С•Р В·РЎвЂ“, Р ВµР Р†Р В°Р С”РЎС“Р В°РЎвЂ РЎвЂ“РЎвЂ” Р С—Р С•РЎР‚Р В°Р Р…Р ВµР Р…Р С‘РЎвЂ¦ РЎвЂљР В° Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СРЎвЂ РЎвЂ“ РЎС“Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎРѓРЎРЉР С”Р С‘РЎвЂ¦ Р СР ВµР Т‘Р С‘Р С”РЎвЂ“Р Р† РЎвЂ“ Р Р†РЎвЂ“Р в„–РЎРѓРЎРЉР С”Р С•Р Р†Р С‘РЎвЂ¦.",
  },
  {
    align: "center",
    icon: "/founder-overlay-center.svg",
    country: "Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…Р В° - Р РЋР РЃР С’",
    title: "Р вЂњР С› РІР‚СљР РЃР В»РЎРЏРЎвЂ¦ Р С—Р В°Р СРІР‚в„ўРЎРЏРЎвЂљРЎвЂ“РІР‚Сњ",
    text: "Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎРѓРЎРЉР С”Р С•-Р В°Р СР ВµРЎР‚Р С‘Р С”Р В°Р Р…РЎРѓРЎРЉР С”Р В° Р С–РЎР‚Р С•Р СР В°Р Т‘РЎРѓРЎРЉР С”Р В° Р С•РЎР‚Р С–Р В°Р Р…РЎвЂ“Р В·Р В°РЎвЂ РЎвЂ“РЎРЏ, РЎвЂ°Р С• РЎРѓРЎвЂљР Р†Р С•РЎР‚РЎР‹РЎвЂќ Р СР ВµР СР С•РЎР‚РЎвЂ“Р В°Р В»Р С‘ РЎвЂ“Р Р…Р С•Р В·Р ВµР СР Р…Р С‘Р С Р Т‘Р С•Р В±РЎР‚Р С•Р Р†Р С•Р В»РЎРЉРЎвЂ РЎРЏР С, РЎРЏР С”РЎвЂ“ Р В·Р В°Р С–Р С‘Р Р…РЎС“Р В»Р С‘ Р В·Р В°РЎвЂ¦Р С‘РЎвЂ°Р В°РЎР‹РЎвЂЎР С‘ Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎС“. Р В Р ВµР В°Р В»РЎвЂ“Р В·РЎС“РЎвЂќ Р С—РЎР‚Р С•РЎвЂќР С”РЎвЂљР С‘ Р Р†РЎв‚¬Р В°Р Р…РЎС“Р Р†Р В°Р Р…Р Р…РЎРЏ Р С—Р В°Р СРІР‚в„ўРЎРЏРЎвЂљРЎвЂ“, РЎР‚Р С•Р В·Р Р†Р С‘РЎвЂљР С”РЎС“ РЎвЂљР ВµРЎР‚Р С‘РЎвЂљР С•РЎР‚РЎвЂ“Р в„–, Р СРЎвЂ“Р В¶Р Р…Р В°РЎР‚Р С•Р Т‘Р Р…Р С•РЎвЂ” РЎРѓР С•Р В»РЎвЂ“Р Т‘Р В°РЎР‚Р Р…Р С•РЎРѓРЎвЂљРЎвЂ“ РЎвЂљР В° Р С•РЎРѓР Р†РЎвЂ“РЎвЂљР С‘ Р СР С•Р В»Р С•Р Т‘РЎвЂ“.",
  },
  {
    align: "left",
    icon: "/founder-overlay-1.svg",
    country: "Р Р€Р С”РЎР‚Р В°РЎвЂ”Р Р…Р В°",
    title: "Р вЂР С› РІР‚СљР вЂ™Р С•Р В»Р С•Р Р…РЎвЂљР ВµРЎР‚Р С‘ Р вЂР С•Р В»Р ВµРЎвЂ¦РЎвЂ“Р Р†РЎвЂ°Р С‘Р Р…Р С‘РІР‚Сњ",
    text: "Р вЂР В»Р В°Р С–Р С•Р Т‘РЎвЂ“Р в„–Р Р…Р В° Р С•РЎР‚Р С–Р В°Р Р…РЎвЂ“Р В·Р В°РЎвЂ РЎвЂ“РЎРЏ Р В· Р вЂ Р Р†Р В°Р Р…Р С•-Р В¤РЎР‚Р В°Р Р…Р С”РЎвЂ“Р Р†РЎРѓРЎРЉР С”Р С•РЎвЂ” Р С•Р В±Р В»Р В°РЎРѓРЎвЂљРЎвЂ“, РЎвЂ°Р С• Р Р…Р В°Р Т‘Р В°РЎвЂќ РЎРѓР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…РЎС“ РЎвЂљР В° Р С–РЎС“Р СР В°Р Р…РЎвЂ“РЎвЂљР В°РЎР‚Р Р…РЎС“ Р Т‘Р С•Р С—Р С•Р СР С•Р С–РЎС“ Р Р…Р В°РЎРѓР ВµР В»Р ВµР Р…Р Р…РЎР‹. Р С’Р С”РЎвЂљР С‘Р Р†Р Р…Р С• Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СРЎС“РЎвЂќ Р Р†РЎвЂ“Р в„–РЎРѓРЎРЉР С”Р С•Р Р†Р С‘РЎвЂ¦, Р В·Р В°Р в„–Р СР В°РЎвЂќРЎвЂљРЎРЉРЎРѓРЎРЏ Р Р†Р С•Р В»Р С•Р Р…РЎвЂљР ВµРЎР‚РЎРѓРЎРЉР С”Р С•РЎР‹ Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎР‹ РЎвЂљР В° РЎРѓР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…Р С‘Р СР С‘ Р С—РЎР‚Р С•РЎвЂќР С”РЎвЂљР В°Р СР С‘.",
  },
];

const impact = [
  ["4 000+", "Р Р†РЎР‚РЎРЏРЎвЂљР С•Р Р†Р В°Р Р…Р С‘РЎвЂ¦ Р В¶Р С‘РЎвЂљРЎвЂљРЎвЂ“Р Р† Р Р†РЎвЂ“Р в„–РЎРѓРЎРЉР С”Р С•Р Р†Р С•РЎРѓР В»РЎС“Р В¶Р В±Р С•Р Р†РЎвЂ РЎвЂ“Р Р†"],
  ["1 200+", "Р В·Р Т‘РЎвЂ“Р в„–РЎРѓР Р…Р ВµР Р…Р С‘РЎвЂ¦ Р ВµР Р†Р В°Р С”РЎС“Р В°РЎвЂ РЎвЂ“Р в„–Р Р…Р С‘РЎвЂ¦ Р Р†Р С‘РЎвЂ”Р В·Р Т‘РЎвЂ“Р Р†"],
  ["85%", "Р С—Р С•РЎР‚Р В°Р Р…Р ВµР Р…Р С‘РЎвЂ¦ РЎС“РЎРѓР С—РЎвЂ“РЎв‚¬Р Р…Р С• Р С—РЎР‚Р С•Р в„–РЎв‚¬Р В»Р С‘ РЎР‚Р ВµР В°Р В±РЎвЂ“Р В»РЎвЂ“РЎвЂљР В°РЎвЂ РЎвЂ“РЎР‹"],
  ["60%", "Р В·Р В°РЎвЂ¦Р С‘РЎРѓР Р…Р С‘Р С”РЎвЂ“Р Р† Р С—Р С•Р Р†Р ВµРЎР‚Р Р…РЎС“Р В»Р С‘РЎРѓРЎРЏ РЎС“ РЎРѓРЎвЂљРЎР‚РЎвЂ“Р в„–"],
  ["6", "РЎРѓР С—Р ВµРЎвЂ Р В°Р Р†РЎвЂљР С•Р СР С•Р В±РЎвЂ“Р В»РЎвЂ“Р Р† РЎС“ Р С—Р В°РЎР‚Р С”РЎС“"],
];

const projectCards = [
  {
    title: "Р В Р вЂўР вЂ",
    icon: "/project-icons/03.png",
    detailTitle: "Р вЂќР С•Р С—Р С•Р СР С•Р С–Р В° Р С—РЎвЂ“Р Т‘РЎР‚Р С•Р В·Р Т‘РЎвЂ“Р В»Р В°Р С Р вЂ”Р РЋР Р€",
    detailText: "Р вЂ”Р В°Р В±Р ВµР В·Р С—Р ВµРЎвЂЎРЎС“РЎвЂќР СР С• РЎС“Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎРѓРЎРЉР С”Р С‘РЎвЂ¦ Р В·Р В°РЎвЂ¦Р С‘РЎРѓР Р…Р С‘Р С”РЎвЂ“Р Р† Р Р…Р ВµР С•Р В±РЎвЂ¦РЎвЂ“Р Т‘Р Р…Р С‘Р С Р С•Р В±Р В»Р В°Р Т‘Р Р…Р В°Р Р…Р Р…РЎРЏР С, РЎвЂљР ВµРЎвЂ¦Р Р…РЎвЂ“Р С”Р С•РЎР‹ РЎвЂљР В° Р В·Р В°РЎРѓР С•Р В±Р В°Р СР С‘ Р Т‘Р В»РЎРЏ Р ВµРЎвЂћР ВµР С”РЎвЂљР С‘Р Р†Р Р…Р С•Р С–Р С• Р Р†Р С‘Р С”Р С•Р Р…Р В°Р Р…Р Р…РЎРЏ Р В±Р С•Р в„–Р С•Р Р†Р С‘РЎвЂ¦ Р В·Р В°Р Р†Р Т‘Р В°Р Р…РЎРЉ",
    openText: "Р СџР ВµРЎР‚Р ВµР Т‘Р В°РЎвЂЎР В° РЎРѓРЎС“РЎвЂЎР В°РЎРѓР Р…Р С‘РЎвЂ¦ Р В·Р В°РЎРѓР С•Р В±РЎвЂ“Р Р† РЎР‚Р В°Р Т‘РЎвЂ“Р С•Р ВµР В»Р ВµР С”РЎвЂљРЎР‚Р С•Р Р…Р Р…Р С•РЎвЂ” Р В±Р С•РЎР‚Р С•РЎвЂљРЎРЉР В±Р С‘",
  },
  {
    title: "Р вЂќРЎР‚Р С•Р Р…Р С‘",
    icon: "/project-icons/01.png",
    detailTitle: "Р вЂќР С•Р С—Р С•Р СР С•Р С–Р В° Р С—РЎвЂ“Р Т‘РЎР‚Р С•Р В·Р Т‘РЎвЂ“Р В»Р В°Р С Р вЂ”Р РЋР Р€",
    detailText: "Р вЂ”Р В°Р В±Р ВµР В·Р С—Р ВµРЎвЂЎРЎС“РЎвЂќР СР С• РЎС“Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎРѓРЎРЉР С”Р С‘РЎвЂ¦ Р В·Р В°РЎвЂ¦Р С‘РЎРѓР Р…Р С‘Р С”РЎвЂ“Р Р† Р Р…Р ВµР С•Р В±РЎвЂ¦РЎвЂ“Р Т‘Р Р…Р С‘Р С Р С•Р В±Р В»Р В°Р Т‘Р Р…Р В°Р Р…Р Р…РЎРЏР С, РЎвЂљР ВµРЎвЂ¦Р Р…РЎвЂ“Р С”Р С•РЎР‹ РЎвЂљР В° Р В·Р В°РЎРѓР С•Р В±Р В°Р СР С‘ Р Т‘Р В»РЎРЏ Р ВµРЎвЂћР ВµР С”РЎвЂљР С‘Р Р†Р Р…Р С•Р С–Р С• Р Р†Р С‘Р С”Р С•Р Р…Р В°Р Р…Р Р…РЎРЏ Р В±Р С•Р в„–Р С•Р Р†Р С‘РЎвЂ¦ Р В·Р В°Р Р†Р Т‘Р В°Р Р…РЎРЉ",
    openText: "Р вЂ”Р В°Р С”РЎС“Р С—РЎвЂ“Р Р†Р В»РЎРЏ Р В±Р ВµР В·Р С—РЎвЂ“Р В»Р С•РЎвЂљР Р…Р С‘РЎвЂ¦ Р В»РЎвЂ“РЎвЂљР В°Р В»РЎРЉР Р…Р С‘РЎвЂ¦ Р В°Р С—Р В°РЎР‚Р В°РЎвЂљРЎвЂ“Р Р† Р Т‘Р В»РЎРЏ РЎР‚Р С•Р В·Р Р†РЎвЂ“Р Т‘Р С”Р С‘ РЎвЂљР В° Р Р†Р С‘Р С”Р С•Р Р…Р В°Р Р…Р Р…РЎРЏ Р В±Р С•Р в„–Р С•Р Р†Р С‘РЎвЂ¦ Р СРЎвЂ“РЎРѓРЎвЂ“Р в„–",
  },
  {
    title: "Р С’Р Р†РЎвЂљР С•Р СР С•Р В±РЎвЂ“Р В»РЎвЂ“",
    icon: "/project-icons/02.png",
    detailTitle: "Р вЂќР С•Р С—Р С•Р СР С•Р С–Р В° Р С—РЎвЂ“Р Т‘РЎР‚Р С•Р В·Р Т‘РЎвЂ“Р В»Р В°Р С Р вЂ”Р РЋР Р€",
    detailText: "Р вЂ”Р В°Р В±Р ВµР В·Р С—Р ВµРЎвЂЎРЎС“РЎвЂќР СР С• РЎС“Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎРѓРЎРЉР С”Р С‘РЎвЂ¦ Р В·Р В°РЎвЂ¦Р С‘РЎРѓР Р…Р С‘Р С”РЎвЂ“Р Р† Р Р…Р ВµР С•Р В±РЎвЂ¦РЎвЂ“Р Т‘Р Р…Р С‘Р С Р С•Р В±Р В»Р В°Р Т‘Р Р…Р В°Р Р…Р Р…РЎРЏР С, РЎвЂљР ВµРЎвЂ¦Р Р…РЎвЂ“Р С”Р С•РЎР‹ РЎвЂљР В° Р В·Р В°РЎРѓР С•Р В±Р В°Р СР С‘ Р Т‘Р В»РЎРЏ Р ВµРЎвЂћР ВµР С”РЎвЂљР С‘Р Р†Р Р…Р С•Р С–Р С• Р Р†Р С‘Р С”Р С•Р Р…Р В°Р Р…Р Р…РЎРЏ Р В±Р С•Р в„–Р С•Р Р†Р С‘РЎвЂ¦ Р В·Р В°Р Р†Р Т‘Р В°Р Р…РЎРЉ",
    openText: "Р вЂ”Р В°Р С”РЎС“Р С—РЎвЂ“Р Р†Р В»РЎРЏ РЎвЂљР В° Р С—Р ВµРЎР‚Р ВµР Т‘Р В°РЎвЂЎР В° РЎвЂљРЎР‚Р В°Р Р…РЎРѓР С—Р С•РЎР‚РЎвЂљРЎС“ Р Т‘Р В»РЎРЏ Р Р†Р С‘Р С”Р С•Р Р…Р В°Р Р…Р Р…РЎРЏ Р В±Р С•Р в„–Р С•Р Р†Р С‘РЎвЂ¦ РЎвЂ“ Р В»Р С•Р С–РЎвЂ“РЎРѓРЎвЂљР С‘РЎвЂЎР Р…Р С‘РЎвЂ¦ Р В·Р В°Р Р†Р Т‘Р В°Р Р…РЎРЉ",
  },
  {
    title: "Р вЂњР ВµР Р…Р ВµРЎР‚Р В°РЎвЂљР С•РЎР‚Р С‘",
    icon: "/project-icons/04.png",
    detailTitle: "Р вЂќР С•Р С—Р С•Р СР С•Р С–Р В° Р С—РЎвЂ“Р Т‘РЎР‚Р С•Р В·Р Т‘РЎвЂ“Р В»Р В°Р С Р вЂ”Р РЋР Р€",
    detailText: "Р вЂ”Р В°Р В±Р ВµР В·Р С—Р ВµРЎвЂЎРЎС“РЎвЂќР СР С• РЎС“Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎРѓРЎРЉР С”Р С‘РЎвЂ¦ Р В·Р В°РЎвЂ¦Р С‘РЎРѓР Р…Р С‘Р С”РЎвЂ“Р Р† Р Р…Р ВµР С•Р В±РЎвЂ¦РЎвЂ“Р Т‘Р Р…Р С‘Р С Р С•Р В±Р В»Р В°Р Т‘Р Р…Р В°Р Р…Р Р…РЎРЏР С, РЎвЂљР ВµРЎвЂ¦Р Р…РЎвЂ“Р С”Р С•РЎР‹ РЎвЂљР В° Р В·Р В°РЎРѓР С•Р В±Р В°Р СР С‘ Р Т‘Р В»РЎРЏ Р ВµРЎвЂћР ВµР С”РЎвЂљР С‘Р Р†Р Р…Р С•Р С–Р С• Р Р†Р С‘Р С”Р С•Р Р…Р В°Р Р…Р Р…РЎРЏ Р В±Р С•Р в„–Р С•Р Р†Р С‘РЎвЂ¦ Р В·Р В°Р Р†Р Т‘Р В°Р Р…РЎРЉ",
    openText: "Р вЂ”Р В°Р В±Р ВµР В·Р С—Р ВµРЎвЂЎР ВµР Р…Р Р…РЎРЏ Р В°Р Р†РЎвЂљР С•Р Р…Р С•Р СР Р…Р С‘Р С Р В¶Р С‘Р Р†Р В»Р ВµР Р…Р Р…РЎРЏР С Р С—РЎвЂ“Р Т‘РЎР‚Р С•Р В·Р Т‘РЎвЂ“Р В»РЎвЂ“Р Р† РЎС“ Р С—Р С•Р В»РЎРЉР С•Р Р†Р С‘РЎвЂ¦ РЎС“Р СР С•Р Р†Р В°РЎвЂ¦",
  },
  {
    title: "Р вЂўР С”Р С•РЎвЂћР В»Р С•РЎС“",
    icon: "/project-icons/05.png",
    detailTitle: "Р вЂќР С•Р С—Р С•Р СР С•Р С–Р В° Р С—РЎвЂ“Р Т‘РЎР‚Р С•Р В·Р Т‘РЎвЂ“Р В»Р В°Р С Р вЂ”Р РЋР Р€",
    detailText: "Р вЂ”Р В°Р В±Р ВµР В·Р С—Р ВµРЎвЂЎРЎС“РЎвЂќР СР С• РЎС“Р С”РЎР‚Р В°РЎвЂ”Р Р…РЎРѓРЎРЉР С”Р С‘РЎвЂ¦ Р В·Р В°РЎвЂ¦Р С‘РЎРѓР Р…Р С‘Р С”РЎвЂ“Р Р† Р Р…Р ВµР С•Р В±РЎвЂ¦РЎвЂ“Р Т‘Р Р…Р С‘Р С Р С•Р В±Р В»Р В°Р Т‘Р Р…Р В°Р Р…Р Р…РЎРЏР С, РЎвЂљР ВµРЎвЂ¦Р Р…РЎвЂ“Р С”Р С•РЎР‹ РЎвЂљР В° Р В·Р В°РЎРѓР С•Р В±Р В°Р СР С‘ Р Т‘Р В»РЎРЏ Р ВµРЎвЂћР ВµР С”РЎвЂљР С‘Р Р†Р Р…Р С•Р С–Р С• Р Р†Р С‘Р С”Р С•Р Р…Р В°Р Р…Р Р…РЎРЏ Р В±Р С•Р в„–Р С•Р Р†Р С‘РЎвЂ¦ Р В·Р В°Р Р†Р Т‘Р В°Р Р…РЎРЉ",
    openText: "Р СџР С•РЎР‚РЎвЂљР В°РЎвЂљР С‘Р Р†Р Р…РЎвЂ“ Р В·Р В°РЎР‚РЎРЏР Т‘Р Р…РЎвЂ“ РЎРѓРЎвЂљР В°Р Р…РЎвЂ РЎвЂ“РЎвЂ” Р Т‘Р В»РЎРЏ Р В±Р ВµР В·Р С—Р ВµРЎР‚Р ВµР В±РЎвЂ“Р в„–Р Р…Р С•Р С–Р С• Р В¶Р С‘Р Р†Р В»Р ВµР Р…Р Р…РЎРЏ Р С•Р В±Р В»Р В°Р Т‘Р Р…Р В°Р Р…Р Р…РЎРЏ РЎвЂљР В° Р В·Р В°РЎРѓР С•Р В±РЎвЂ“Р Р† Р В·Р Р†'РЎРЏР В·Р С”РЎС“",
  },
];

const helpOptions = [
  {
    icon: "/help-icons/support.svg",
    title: "Р СџРЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р В°",
    text: "Р вЂќР С•Р С—Р С•Р СР С•Р В¶РЎвЂ“РЎвЂљРЎРЉ Р С”Р С•РЎв‚¬РЎвЂљР В°Р СР С‘ Р Т‘Р В»РЎРЏ РЎР‚Р ВµР В°Р В»РЎвЂ“Р В·Р В°РЎвЂ РЎвЂ“РЎвЂ” Р С–РЎС“Р СР В°Р Р…РЎвЂ“РЎвЂљР В°РЎР‚Р Р…Р С‘РЎвЂ¦ Р С—РЎР‚Р С•Р С–РЎР‚Р В°Р С",
  },
  {
    icon: "/help-icons/share.svg",
    title: "Р вЂ Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ РЎвЂ“Р в„–Р Р…Р В° Р С—РЎвЂ“Р Т‘РЎвЂљРЎР‚Р С‘Р СР С”Р В°",
    text: "Р СџР С•РЎв‚¬Р С‘РЎР‚РЎвЂљР Вµ РЎвЂ“Р Р…РЎвЂћР С•РЎР‚Р СР В°РЎвЂ РЎвЂ“РЎР‹ Р С—РЎР‚Р С• Р Р…Р В°РЎв‚¬РЎС“ Р Т‘РЎвЂ“РЎРЏР В»РЎРЉР Р…РЎвЂ“РЎРѓРЎвЂљРЎРЉ РЎС“ РЎРѓР С•РЎвЂ РЎвЂ“Р В°Р В»РЎРЉР Р…Р С‘РЎвЂ¦ Р СР ВµРЎР‚Р ВµР В¶Р В°РЎвЂ¦",
  },
  {
    icon: "/help-icons/partner.svg",
    title: "Р СџР В°РЎР‚РЎвЂљР Р…Р ВµРЎР‚РЎРѓРЎвЂљР Р†Р С•",
    text: "Р РЋРЎвЂљР В°РЎвЂљР С‘ Р Р…Р В°РЎв‚¬Р С‘Р С Р С—Р В°РЎР‚РЎвЂљР Р…Р ВµРЎР‚Р С•Р С РЎвЂљР В° РЎР‚Р ВµР В°Р В»РЎвЂ“Р В·Р С•Р Р†РЎС“Р Р†Р В°РЎвЂљР С‘ РЎРѓР С—РЎвЂ“Р В»РЎРЉР Р…РЎвЂ“ Р С—РЎР‚Р С•РЎвЂќР С”РЎвЂљР С‘",
  },
  {
    icon: "/help-icons/volunteer.svg",
    title: "Р РЋРЎвЂљР В°РЎвЂљР С‘ Р Р†Р С•Р В»Р С•Р Р…РЎвЂљР ВµРЎР‚Р С•Р С",
    text: "Р вЂќР С•Р В»РЎС“РЎвЂЎРЎвЂ“РЎвЂљРЎРЉРЎРѓРЎРЏ Р Т‘Р С• Р Р…Р В°РЎв‚¬Р С•РЎвЂ” Р С”Р С•Р СР В°Р Р…Р Т‘Р С‘ Р Р†Р С•Р В»Р С•Р Р…РЎвЂљР ВµРЎР‚РЎвЂ“Р Р† РЎвЂљР В° Р Т‘Р С•Р С—Р С•Р СР В°Р С–Р В°Р в„–РЎвЂљР Вµ",
  },
];

const directionsEn = [
  "Psychological Support",
  "Educational Initiatives",
  "Advocacy",
  "Social Services",
  "Social Entrepreneurship",
  "Construction & Infrastructure",
  "Cultural Initiatives",
  "Environmental Protection",
  "International Cooperation",
  "Healthcare & Rehabilitation",
  "Financial & Asset Management",
  "Memorialization & Commemoration",
];

const directionDetailsEn = [
  "Providing psychological assistance, crisis intervention, peer support groups, and psychoeducational outreach.",
  "Developing educational programs, organizing workshops and training sessions, and conducting informational awareness campaigns.",
  "Protecting human rights, promoting legal awareness, and advocating for the public interest at the systemic level.",
  "Providing comprehensive social support, protecting rights, and facilitating social adaptation and reintegration.",
  "Supporting employment, developing social enterprises, and providing capacity building and skills training.",
  "Rebuilding facilities, conducting repair works, and maintaining vital civilian infrastructure.",
  "Preserving cultural heritage, organizing events, and promoting intercultural dialogue.",
  "Promoting environmental conservation, eco-education, and sustainable resource management.",
  "Fostering international partnerships, fundraising, and facilitating the cross-border exchange of knowledge and expertise.",
  "Facilitating medical care, physical rehabilitation, and psychosocial support for those affected by the war.",
  "Coordinating donor programs, ensuring transparent resource management, and overseeing financial management.",
  "Creating memorials to honor fallen foreign volunteers, implementing memorial initiatives, and promoting international solidarity and youth education.",
];

const directionMobileDetailsEn: Partial<Record<number, string>> = {
  11: "Memorials for fallen foreign volunteers and remembrance initiatives.",
};

const statsEn = [
  ["3", "Partner Countries"],
  ["13", "Focus Areas"],
  ["1000+", "Beneficiaries Reached"],
  ["24/7", "Humanitarian Support"],
];

const founderCardsEn = [
  {
    align: "left",
    icon: "/founder-overlay-1.svg",
    country: "Latvia",
    title: "Ganta Fonds",
    text: "A Latvian charitable foundation initiating national and international humanitarian projects. It specializes in mobile medical care, casualty evacuation, and supporting Ukrainian medics and military personnel.",
  },
  {
    align: "center",
    icon: "/founder-overlay-center.svg",
    country: "Ukraine - USA",
    title: "NGO \"Path of Memory\"",
    text: "A Ukrainian-American non-governmental organization creating memorials to honor foreign volunteers who have fallen in defense of Ukraine. It implements projects focused on memorialization, community development, international solidarity, and youth education.",
  },
  {
    align: "left",
    icon: "/founder-overlay-1.svg",
    country: "Ukraine",
    title: "Charitable Organization \"Volunteers of Bolekhivshchyna\"",
    text: "A charitable organization based in the Ivano-Frankivsk region, providing targeted social and humanitarian assistance to civilians. It actively supports the military, engages in volunteering, and implements community social projects.",
  },
];

const impactEn = [
  ["4 000+", "lives of military personnel saved"],
  ["1 200+", "successful evacuation missions completed"],
  ["85%", "of the wounded have successfully undergone rehabilitation"],
  ["60%", "defenders have returned to active duty or full civilian life"],
  ["6", "specialized vehicles in our fleet"],
];

const projectCardsEn = [
  {
    title: "Electronic Warfare (EW) Systems",
    icon: "/project-icons/03.png",
    detailTitle: "Support for the Armed Forces of Ukraine",
    detailText: "We provide Ukrainian defenders with the essential equipment, vehicles, and resources needed to effectively execute their combat missions.",
    openText: "Delivery of modern electronic warfare (EW) systems",
  },
  {
    title: "Drones (UAVs)",
    icon: "/project-icons/01.png",
    detailTitle: "Support for the Armed Forces of Ukraine",
    detailText: "We provide Ukrainian defenders with the essential equipment, vehicles, and resources needed to effectively execute their combat missions.",
    openText: "Procurement of unmanned aerial vehicles for reconnaissance and combat missions",
  },
  {
    title: "Vehicles",
    icon: "/project-icons/02.png",
    detailTitle: "Support for the Armed Forces of Ukraine",
    detailText: "We provide Ukrainian defenders with the essential equipment, vehicles, and resources needed to effectively execute their combat missions.",
    openText: "Procurement and delivery of vehicles for combat and logistics tasks",
  },
  {
    title: "Generators",
    icon: "/project-icons/04.png",
    detailTitle: "Support for the Armed Forces of Ukraine",
    detailText: "We provide Ukrainian defenders with the essential equipment, vehicles, and resources needed to effectively execute their combat missions.",
    openText: "Providing autonomous power supply for units in field conditions",
  },
  {
    title: "Portable Power Stations",
    icon: "/project-icons/05.png",
    detailTitle: "Support for the Armed Forces of Ukraine",
    detailText: "We provide Ukrainian defenders with the essential equipment, vehicles, and resources needed to effectively execute their combat missions.",
    openText: "Portable charging stations for uninterrupted power to equipment and communication devices",
  },
];

const rehabServicesEn = [
  "Rehabilitation Center",
  "Long-Term Therapy Facility",
  "Geriatric Center",
  "Center for Military & Civilians",
  "Prosthetics Department",
  "Equine-Assisted Therapy Area",
  "Sensory Garden",
  "Spiritual Care Space (Chapel)",
];

const helpOptionsEn = [
  {
    icon: "/help-icons/support.svg",
    title: "Financial Support",
    text: "Donate to fund our joint humanitarian programs and initiatives.",
  },
  {
    icon: "/help-icons/share.svg",
    title: "Spread the Word",
    text: "Share information about our alliance and our work on your social media platforms.",
  },
  {
    icon: "/help-icons/partner.svg",
    title: "Strategic Partnerships",
    text: "Collaborate with our alliance on joint projects, grant programs, and humanitarian missions.",
  },
  {
    icon: "/help-icons/volunteer.svg",
    title: "Volunteer",
    text: "Join our international volunteer team and make a hands-on difference.",
  },
];

function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const match = value.match(/^([\d\s]+)(.*)$/);

    if (!match) {
      setDisplayValue(value);
      return;
    }

    const rawNumber = match[1];
    const target = Number(rawNumber.replace(/\s/g, ""));
    const suffix = match[2] || "";
    const shouldPad = value.startsWith("0");
    const padLength = rawNumber.length;
    const hasThousandsSpace = rawNumber.includes(" ");
    const formatNumber = (current: number) => {
      const base = shouldPad ? String(current).padStart(padLength, "0") : String(current);
      return hasThousandsSpace ? base.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : base;
    };
    const format = (current: number) => `${formatNumber(current)}${suffix}`;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setDisplayValue(format(0));

    if (prefersReducedMotion) {
      setDisplayValue(format(target));
      return;
    }

    let frame = 0;
    let fallback = 0;
    let started = false;
    let startTime = 0;
    const duration = 1400;

    const start = () => {
      if (started) {
        return;
      }

      started = true;
      frame = requestAnimationFrame(run);
    };

    const run = (time: number) => {
      if (!startTime) {
        startTime = time;
      }

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(format(Math.round(target * eased)));

      if (progress < 1) {
        frame = requestAnimationFrame(run);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    if (ref.current) {
      observer.observe(ref.current);

      const rect = ref.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        start();
        observer.disconnect();
      }
    }

    fallback = window.setTimeout(() => {
      if (!started) {
        setDisplayValue(format(target));
        observer.disconnect();
      }
    }, duration + 600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <strong ref={ref}>{displayValue}</strong>;
}

function mailForm(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") || "");
  const email = String(data.get("email") || "");
  const topic = String(data.get("topic") || "Р вЂ”Р В°РЎРЏР Р†Р С”Р В° Р В· РЎРѓР В°Р в„–РЎвЂљРЎС“");
  const message = String(data.get("message") || "");
  const body = [
    `Р вЂ Р С'РЎРЏ: ${name}`,
    `Email: ${email}`,
    "",
    message,
  ].join("\n");

  window.location.href = `mailto:pn.hum.alliance@gmail.com?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ua");
  const [directionPage, setDirectionPage] = useState(0);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [activeDirection, setActiveDirection] = useState<number | null>(null);
  const [projectPage, setProjectPage] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [openProject, setOpenProject] = useState<number | null>(null);
  const [isHeaderCompact, setIsHeaderCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const copy = siteCopy[language];
  const currentDirections = language === "en" ? directionsEn : directions;
  const currentDirectionDetails = language === "en" ? directionDetailsEn : directionDetails;
  const currentMobileDirectionDetails = language === "en" ? directionMobileDetailsEn : directionMobileDetails;
  const currentDirectionIcons = language === "en" ? directionIconsEn : directionIcons;
  const currentStats = language === "en" ? statsEn : stats;
  const currentFounderCards = language === "en" ? founderCardsEn : founderCards;
  const currentImpact = language === "en" ? impactEn : impact;
  const currentProjectCards = language === "en" ? projectCardsEn : projectCards;
  const currentHelpOptions = language === "en" ? helpOptionsEn : helpOptions;
  const currentRehabServices = language === "en"
    ? rehabServicesEn
    : [
      "Р В Р ВµР В°Р В±РЎвЂ“Р В»РЎвЂ“РЎвЂљР В°РЎвЂ РЎвЂ“Р в„–Р Р…Р С‘Р в„– РЎвЂ Р ВµР Р…РЎвЂљРЎР‚",
      "Р С™Р С•РЎР‚Р С—РЎС“РЎРѓ Р Т‘Р В»РЎРЏ Р Т‘Р С•Р Р†Р С–Р С•РЎвЂљРЎР‚Р С‘Р Р†Р В°Р В»Р С•РЎвЂ” РЎвЂљР ВµРЎР‚Р В°Р С—РЎвЂ“РЎвЂ”",
      "Р вЂњР ВµРЎР‚РЎвЂ“Р В°РЎвЂљРЎР‚Р С‘РЎвЂЎР Р…Р С‘Р в„– РЎвЂ Р ВµР Р…РЎвЂљРЎР‚",
      "Р В¦Р ВµР Р…РЎвЂљРЎР‚ Р Т‘Р В»РЎРЏ Р Р†РЎвЂ“Р в„–РЎРѓРЎРЉР С”Р С•Р Р†Р С‘РЎвЂ¦ РЎвЂ“ РЎвЂ Р С‘Р Р†РЎвЂ“Р В»РЎРЉР Р…Р С‘РЎвЂ¦",
      "Р СџРЎР‚Р С•РЎвЂљР ВµР В·РЎС“Р Р†Р В°Р Р…Р Р…РЎРЏ",
      "Р вЂќРЎвЂ“Р В»РЎРЏР Р…Р С”Р В° РЎвЂ“Р С—Р С•РЎвЂљР ВµРЎР‚Р В°Р С—РЎвЂ“РЎвЂ”",
      "Р РЋР ВµР Р…РЎРѓР С•РЎР‚Р Р…Р С‘Р в„– РЎРѓР В°Р Т‘",
      "Р вЂќРЎС“РЎвЂ¦Р С•Р Р†Р Р…Р С‘Р в„– Р С—РЎР‚Р С•РЎРѓРЎвЂљРЎвЂ“РЎР‚ - Р С”Р В°Р С—Р В»Р С‘РЎвЂ РЎРЏ",
    ];
  const currentProject = currentProjectCards[activeProject];
  const directionMaxPage = isMobileLayout ? 2 : 1;
  const projectMaxPage = isMobileLayout ? 2 : 1;

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "uk";
  }, [language]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 980px)");
    const updateMobileLayout = () => setIsMobileLayout(media.matches);

    updateMobileLayout();
    media.addEventListener("change", updateMobileLayout);
    return () => media.removeEventListener("change", updateMobileLayout);
  }, []);

  useEffect(() => {
    setDirectionPage((page) => Math.min(page, directionMaxPage));
  }, [directionMaxPage]);

  useEffect(() => {
    setProjectPage((page) => Math.min(page, projectMaxPage));
  }, [projectMaxPage]);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-lock", isMobileMenuOpen);

    return () => {
      document.body.classList.remove("mobile-menu-lock");
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY < 30) {
        setIsHeaderCompact(false);
      } else if (delta > 8) {
        setIsHeaderCompact(true);
      } else if (delta < -8) {
        setIsHeaderCompact(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const elements = document.querySelectorAll<HTMLElement>(
      ".section, .donation-callout, .rehab-services, .contact-card, footer",
    );

    elements.forEach((element) => element.classList.add("reveal-on-scroll"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);

    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    const headerHeight = window.innerWidth <= 720 ? 136 : 140;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.history.pushState(null, "", `#${targetId}`);
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  return (
    <main>
      <header className={`site-header${isHeaderCompact ? " is-compact" : ""}`}>
        <a className="brand" href="#home" aria-label="Power of the Nation">
          <img src={assetPath("/logo.png")} alt="Power of the Nation Humanitarian Alliance" />
        </a>
        <nav className={isMobileMenuOpen ? "is-open" : ""} aria-label={copy.aria.mainNav}>
          <a href="#home" onClick={(event) => handleNavClick(event, "home")}>{copy.nav.home}</a>
          <a href="#directions" onClick={(event) => handleNavClick(event, "directions")}>{copy.nav.directions}</a>
          <a href="#founders" onClick={(event) => handleNavClick(event, "founders")}>{copy.nav.founders}</a>
          <a href="#projects" onClick={(event) => handleNavClick(event, "projects")}>{copy.nav.projects}</a>
          <a href="#contacts" onClick={(event) => handleNavClick(event, "contacts")}>{copy.nav.contacts}</a>
        </nav>
        <a className="button primary compact" href="#support">{copy.support}</a>
        <button
          className={`mobile-menu-toggle${isMobileMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={copy.aria.openMenu}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
        >
          <img
            src={assetPath(isMobileMenuOpen ? "/menu-open.svg" : "/menu-hamburger.svg")}
            alt=""
            aria-hidden="true"
          />
        </button>
        <button
          className="language"
          type="button"
          aria-label={copy.aria.language}
          onClick={() => setLanguage((current) => (current === "ua" ? "en" : "ua"))}
        >
          {language.toUpperCase()}
        </button>
      </header>

      <div className={`mobile-menu-panel${isMobileMenuOpen ? " is-open" : ""}`} aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-menu-shell">
          <div className="mobile-menu-card">
            <a className="mobile-menu-brand" href="#home" onClick={(event) => handleNavClick(event, "home")} aria-label="Power of the Nation">
              <img src={assetPath("/logo.png")} alt="Power of the Nation Humanitarian Alliance" />
            </a>
            <button
              className="mobile-menu-close"
              type="button"
              aria-label={copy.aria.closeMenu}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <img src={assetPath("/menu-open.svg")} alt="" aria-hidden="true" />
            </button>
          </div>

          <div className="mobile-language-switch" aria-label={copy.aria.mobileLanguage}>
            <button className={language === "ua" ? "is-active" : ""} type="button" onClick={() => setLanguage("ua")}><span />UA</button>
            <button className={language === "en" ? "is-active" : ""} type="button" onClick={() => setLanguage("en")}><span />EN</button>
          </div>

          <nav className="mobile-menu-links" aria-label={copy.aria.mobileNav}>
            <a href="#home" onClick={(event) => handleNavClick(event, "home")}>{copy.nav.home}</a>
            <a href="#directions" onClick={(event) => handleNavClick(event, "directions")}>{copy.nav.directions}</a>
            <a href="#founders" onClick={(event) => handleNavClick(event, "founders")}>{copy.nav.founders}</a>
            <a href="#projects" onClick={(event) => handleNavClick(event, "projects")}>{copy.nav.projects}</a>
            <a href="#contacts" onClick={(event) => handleNavClick(event, "contacts")}>{copy.nav.contacts}</a>
          </nav>

          <a className="mobile-menu-support" href="#support" onClick={(event) => handleNavClick(event, "support")}>{copy.support}</a>
        </div>
      </div>

      <section className="hero section" id="home">
        <div className="hero-copy">
          <p className="eyebrow">{copy.hero.eyebrow}</p>
          <h1>{copy.hero.title}</h1>
          <p className="lead">{copy.hero.lead}</p>
          <div className="actions">
            <a className="button primary" href="#support">{copy.support}</a>
            <a className="button secondary" href="#contacts">
              {copy.partner}
              <img className="button-icon" src={assetPath("/btn-arrow.svg")} alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <img src={assetPath("/hero-shield.png")} alt="" width={760} height={755} decoding="async" fetchPriority="high" />
        </div>
      </section>

      <section className="section directions" id="directions">
        <div className="directions-head">
          <div className="directions-title">
            <p className="directions-eyebrow">{copy.directions.eyebrow}</p>
            <h2>{copy.directions.title}</h2>
          </div>
          <div className="directions-controls">
            <button
              aria-label={copy.aria.previousDirections}
              className="direction-control"
              disabled={directionPage === 0}
              onClick={() => setDirectionPage((page) => Math.max(0, page - 1))}
              type="button"
            >
              <img
                className={directionPage === 0 ? "" : "is-flipped"}
                src={assetPath(directionPage === 0 ? "/slider-prev.svg" : "/slider-next.svg")}
                alt=""
                aria-hidden="true"
              />
            </button>
            <button
              aria-label={copy.aria.nextDirections}
              className="direction-control"
              disabled={directionPage === directionMaxPage}
              onClick={() => setDirectionPage((page) => Math.min(directionMaxPage, page + 1))}
              type="button"
            >
              <img src={assetPath("/slider-next.svg")} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="direction-slider">
          <div
            aria-label={copy.directions.title}
            className="direction-grid"
            style={{
              "--slide-x": `-${directionPage * (isMobileLayout ? 350 : 1305)}px`,
            } as React.CSSProperties}
          >
            {currentDirections.map((direction, index) => (
              <article
                aria-expanded={activeDirection === index}
                aria-label={direction}
                className={`direction-card${activeDirection === index ? " is-open" : ""}`}
                key={`${language}-direction-${index}`}
                onClick={() => setActiveDirection(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveDirection(index);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {activeDirection === index ? (
                  <>
                    <p className="direction-detail-text">
                      {isMobileLayout
                        ? currentMobileDirectionDetails[index] ?? currentDirectionDetails[index]
                        : currentDirectionDetails[index]}
                    </p>
                    <button
                      aria-label={copy.aria.closeCard}
                      className="direction-close"
                      onClick={(event) => {
                        event.stopPropagation();
                        setActiveDirection(null);
                      }}
                      type="button"
                    />
                  </>
                ) : (
                  <>
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                    <img className="card-icon" src={assetPath(currentDirectionIcons[index])} alt="" aria-hidden="true" />
                    <h3>{direction}</h3>
                    <img className="arrow" src={assetPath("/arrow-right-circle.svg")} alt="" aria-hidden="true" />
                  </>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section founders" id="founders">
        <div className="section-head wide">
          <p className="eyebrow">{copy.founders.eyebrow}</p>
          <h2>{copy.founders.title}</h2>
          <p>{copy.founders.lead}</p>
        </div>
        <div className="stats">
          {currentStats.map(([value, label], index) => (
            <div key={`${language}-stat-${index}`}>
              <AnimatedStat value={value} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="founder-grid">
          {currentFounderCards.map((founder, index) => (
            <article className="founder-card" key={`${language}-founder-${index}`}>
              <img className="founder-icon" src={assetPath(founder.icon)} alt="" aria-hidden="true" />
              <h3>{founder.title}</h3>
              <p className="country">{founder.country}</p>
              <p>{founder.text}</p>
              <a className="button secondary full" href="#contacts">
                {copy.learnMore}
                <img className="button-icon" src={assetPath("/btn-arrow.svg")} alt="" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects projects-showcase" id="projects">
        <div className="projects-title">
          <div>
            <p className="projects-eyebrow">{copy.projects.eyebrow}</p>
            <h2>{copy.projects.title}</h2>
          </div>
          <p>
            {copy.projects.lead}
            <br />
            {copy.projects.leadSecond}
          </p>
        </div>
        <div className="project-feature">
          <div className="project-feature-copy">
            <div className="project-feature-heading">
              <span>01</span>
              <h3>{currentProject.detailTitle}</h3>
            </div>
            <p>{currentProject.detailText}</p>
          </div>
          <div className="project-controls">
            <button
              aria-label={copy.aria.previousProjects}
              className="direction-control"
              disabled={projectPage === 0}
              onClick={() => setProjectPage((page) => Math.max(0, page - 1))}
              type="button"
            >
              <img
                className={projectPage === 0 ? "" : "is-flipped"}
                src={assetPath(projectPage === 0 ? "/slider-prev.svg" : "/slider-next.svg")}
                alt=""
                aria-hidden="true"
              />
            </button>
            <button
              aria-label={copy.aria.nextProjects}
              className="direction-control"
              disabled={projectPage === projectMaxPage}
              onClick={() => setProjectPage((page) => Math.min(projectMaxPage, page + 1))}
              type="button"
            >
              <img src={assetPath("/slider-next.svg")} alt="" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="project-slider">
          <div className="project-card-row" style={{ "--slide-x": `-${projectPage * (isMobileLayout ? 350 : 670)}px` } as React.CSSProperties}>
            {currentProjectCards.map((project, index) => (
              <article
                aria-pressed={openProject === index}
                className={`project-card${activeProject === index ? " is-active" : ""}${openProject === index ? " is-open" : ""}`}
                key={`${language}-project-${index}`}
                onClick={() => {
                  setActiveProject(index);
                  setOpenProject(index);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setActiveProject(index);
                    setOpenProject(index);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                {openProject === index ? (
                  <>
                    <p className="project-open-text">{project.openText}</p>
                    <button
                      aria-label={copy.aria.closeCard}
                      className="direction-close project-close"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenProject(null);
                      }}
                      type="button"
                    />
                  </>
                ) : (
                  <>
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                    <img className="project-card-icon" src={assetPath(project.icon)} alt="" aria-hidden="true" />
                    <h3>{project.title}</h3>
                    <img className="arrow" src={assetPath("/arrow-right-circle.svg")} alt="" aria-hidden="true" />
                  </>
                )}
              </article>
            ))}
          </div>
        </div>
        <div className="section-head wide">
          <p className="eyebrow">{copy.projects.eyebrow}</p>
          <h2>{copy.projects.title}</h2>
          <p>
            {copy.projects.lead}
          </p>
        </div>
        <div className="project-block">
          <span>01</span>
          <div>
            <h3>{copy.projects.supportTitle}</h3>
            <p>{currentProjectCards[0].detailText}</p>
          </div>
        </div>
        <div className="project-block">
          <span>02</span>
          <div>
            <h3>{copy.projects.medevacTitle}</h3>
            <p>{copy.projects.medevacText}</p>
          </div>
        </div>
        <div className="medevac-intro">
          <div className="medevac-heading">
            <span>02</span>
            <h2>{copy.projects.medevacTitle}</h2>
          </div>
          <p>
            {copy.projects.medevacText}
            <br />
            {copy.projects.medevacTextSecond}
          </p>
        </div>
        <div className="impact-grid">
          {currentImpact.map(([value, label], index) => (
            <div key={`${language}-impact-${index}`}>
              <AnimatedStat value={value} />
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="donation-callout" id="support">
          <span aria-hidden="true">РІСљС™</span>
          <div>
            <h3>{copy.projects.donationTitle}</h3>
            <a className="button primary full" href="#contacts">{copy.support}</a>
          </div>
        </div>
        <div className="rehab-showcase">
          <div className="medevac-heading rehab-heading">
            <span>03</span>
            <h2>{copy.projects.rehabTitle}</h2>
          </div>
          <p>{copy.projects.rehabText}</p>
          <img src={assetPath("/rehab-building.png")} alt={copy.projects.rehabTitle} decoding="async" loading="lazy" />
          <div className="rehab-services">
            <ul>
              {currentRehabServices.slice(0, 4).map((service) => (
                <li key={service}>
                  <img className="rehab-service-icon" src={assetPath("/rehab-service-bullet.svg")} alt="" aria-hidden="true" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <ul>
              {currentRehabServices.slice(4).map((service) => (
                <li key={service}>
                  <img className="rehab-service-icon" src={assetPath("/rehab-service-bullet.svg")} alt="" aria-hidden="true" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
            <a className="button primary rehab-support" href="#support">{copy.support}</a>
            <a className="button secondary rehab-join" href="#contacts">
              {copy.join}
              <img className="button-icon" src={assetPath("/btn-arrow.svg")} alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="project-block">
          <span>03</span>
          <div>
            <h3>{copy.projects.rehabTitle}</h3>
            <p>{copy.projects.rehabText}</p>
          </div>
        </div>
        <div className="rehab-panel">
          <ul>
            {currentRehabServices.slice(0, 4).map((service) => (
              <li key={service}>
                <img className="rehab-service-icon" src={assetPath("/rehab-service-bullet.svg")} alt="" aria-hidden="true" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
          <ul>
            {currentRehabServices.slice(4).map((service) => (
              <li key={service}>
                <img className="rehab-service-icon" src={assetPath("/rehab-service-bullet.svg")} alt="" aria-hidden="true" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section contacts-intro">
        <div className="section-head wide">
          <p className="eyebrow">{copy.contacts.eyebrow}</p>
          <h2>{copy.contacts.title}</h2>
          <p>{copy.contacts.lead}</p>
        </div>
        <h3 className="support-help-title">{copy.contacts.helpTitle}</h3>
        <div className="support-help-list">
          {currentHelpOptions.map(({ icon, title, text }, index) => (
            <article className="support-help-card" key={`${language}-help-${index}`}>
              <div className="support-help-glass">
                <div className="support-help-content">
                  <img className="support-help-icon" src={assetPath(icon)} alt="" aria-hidden="true" />
                  <div className="support-help-copy">
                  <h3>{title}</h3>
                  <p>{text}</p>
                  </div>
                </div>
                <a className="support-help-button" href="#support">{copy.support}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contacts">
        <div className="contact-card info">
          <h2>{copy.contacts.infoTitle}</h2>
          <div className="contact-info-block">
            <h3>{copy.contacts.contactInfo}</h3>
            <a className="contact-link" href="mailto:pn.hum.alliance@gmail.com">
              <img src={assetPath("/contact-icons/email.svg")} alt="" aria-hidden="true" />
              <span>
                <strong>Email</strong>
                pn.hum.alliance@gmail.com
              </span>
            </a>
            <a className="contact-link" href="tel:+380988823888">
              <img src={assetPath("/contact-icons/phone.svg")} alt="" aria-hidden="true" />
              <span>
                <strong>{copy.contacts.phone}</strong>
                +380 98 882 3888
              </span>
            </a>
          </div>
          <div className="contact-social-block">
            <h3>{copy.contacts.social}</h3>
            <div className="socials">
              <a href="#" aria-label="Facebook">
                <img src={assetPath("/contact-icons/facebook.svg")} alt="" aria-hidden="true" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <img src={assetPath("/contact-icons/linkedin.svg")} alt="" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        <form className="contact-request-form" onSubmit={mailForm}>
          <h3 className="contact-request-title">{copy.contacts.formTitle}</h3>
          <div className="contact-request-row">
            <label className="contact-request-field">
              <span>{copy.contacts.name}</span>
              <input name="name" required />
            </label>
            <label className="contact-request-field">
              <span>{copy.contacts.email}</span>
              <input name="email" type="email" required />
            </label>
          </div>
          <label className="contact-request-field contact-request-topic">
            <span>{copy.contacts.topic}</span>
            <input name="topic" required />
          </label>
          <label className="contact-request-field contact-request-message">
            <span>{copy.contacts.message}</span>
            <textarea name="message" required />
          </label>
          <label className="contact-request-consent">
            <input type="checkbox" required />
            <span>{copy.contacts.consent}</span>
          </label>
          <button className="contact-request-submit" type="submit">{copy.contacts.submit}</button>
        </form>
      </section>

      <footer className="site-footer-v2">
        <div className="site-footer-v2__inner">
          <div className="site-footer-v2__top">
            <a className="site-footer-v2__logo" href="#home" aria-label="Power of the Nation">
              <img src={assetPath("/footer-logo.png")} alt="Power of the Nation Humanitarian Alliance" />
            </a>
            <nav className="site-footer-v2__nav" aria-label={copy.aria.footerNav}>
              <a href="#home">{copy.nav.home}</a>
              <a href="#directions">{copy.nav.directions}</a>
              <a href="#founders">{copy.nav.founders}</a>
              <a href="#contacts">{copy.nav.contacts}</a>
            </nav>
          </div>
          <div className="site-footer-v2__divider" aria-hidden="true" />
          <div className="site-footer-v2__bottom">
            <p className="site-footer-v2__rights">{copy.footer.rights}</p>
            <p className="site-footer-v2__org">{copy.footer.org}</p>
            <p className="site-footer-v2__made">{copy.footer.made} <span className="site-footer-v2__heart" aria-hidden="true">{"\u2665"}</span> {copy.footer.madeTail}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
