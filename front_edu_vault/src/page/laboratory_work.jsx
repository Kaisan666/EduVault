import React from 'react';
import Header from '../components/header';
import DisciplineCard from '../components/DisciplineCard';
import Footer from '../components/footer '; 

const labWorks = [
  { id: 1, title: '', description: '' },
];
const LabWorksPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <div className="labwork-list">
          {labWorks.map(labWork => (
            <DisciplineCard 
              key={labWork.id} 
              title={labWork.title} 
              description={labWork.description} 
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LabWorksPage;