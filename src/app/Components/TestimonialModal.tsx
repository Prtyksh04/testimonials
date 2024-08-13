"use client"

import React,{useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

interface TestimonialModalProps [
    isOpen :boolean,
    onClose : ()=> void
]