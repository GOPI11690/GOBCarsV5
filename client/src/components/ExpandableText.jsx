import { useState } from 'react';
import "../App.css";

// Createa reusable Read More/Less component
export const ExpandableText = ({ children, descriptionLength }) => {
  const fullText = children;

  // Set the initial state of the text to be collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // This function is called when the read more/less button is clicked
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <span className='text'>
      {isExpanded ? fullText : `${fullText.slice(0, descriptionLength)}...`}
      <span onClick={toggleText} className='toggle-button dark:text-sky-400'>
        {isExpanded ? 'Show less' : 'Show more'}
      </span>
      
      
    </span>
  );
};
