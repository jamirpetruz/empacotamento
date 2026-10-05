'use client'

import EmpacotamentoForm from "@/components/forms/EmpacotamentoForm";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import EmpacotamentoSection from "@/components/sections/EmpacotamentoSection";
import { useState } from "react";

export default function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <Layout>
      <EmpacotamentoSection />
    </Layout>
  );
}
