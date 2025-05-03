import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  baseUrl?: string;
}

const FAQContainer = styled.section`
  margin: 2rem 0;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
`;

const FAQTitle = styled.h2`
  background-color: #f8f9fa;
  margin: 0;
  padding: 1.25rem;
  font-size: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

const FAQList = styled.div`
  padding: 1.25rem;
`;

const FAQItemContainer = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Question = styled.button<{ isOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 0.75rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  color: #333;
  
  &:hover {
    color: #3498db;
  }
  
  &:after {
    content: "${props => props.isOpen ? '−' : '+'}";
    font-size: 1.5rem;
    line-height: 1;
  }
`;

const Answer = styled.div<{ isOpen: boolean }>`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  line-height: 1.6;
  margin-left: 1rem;
  opacity: ${props => props.isOpen ? 1 : 0};
  transition: max-height 0.3s ease, opacity 0.3s ease;
  transition-delay: ${props => props.isOpen ? '0s' : '0.1s'};
`;

const FAQItem: React.FC<{ item: FAQItem; index: number }> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <FAQItemContainer>
      <Question 
        isOpen={isOpen} 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        {item.question}
      </Question>
      <Answer 
        isOpen={isOpen}
        id={`faq-answer-${index}`}
        aria-labelledby={`faq-question-${index}`}
      >
        <p>{item.answer}</p>
      </Answer>
    </FAQItemContainer>
  );
};

const FAQ: React.FC<FAQProps> = ({ 
  items, 
  title = "Frequently Asked Questions",
  baseUrl = "https://guy32807.github.io/architectural-designs-affiliate"
}) => {
  // Generate structured data for FAQs
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <FAQContainer>
        <FAQTitle>{title}</FAQTitle>
        <FAQList>
          {items.map((item, index) => (
            <FAQItem key={index} item={item} index={index} />
          ))}
        </FAQList>
      </FAQContainer>
    </>
  );
};

export default FAQ;