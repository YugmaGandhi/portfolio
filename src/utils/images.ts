// Function to get the URL for images in the public folder
export const getImageUrl = (imageName: string): string => {
  return `${import.meta.env.BASE_URL}images/${imageName}`;
};

// Function to get the URL for icons in the public folder
export const getIconUrl = (iconName: string): string => {
  return `${import.meta.env.BASE_URL}icons/${iconName}`;
};

// Default images if we don't have the actual images yet
export const defaultImages = {
  // Project images
  "expense-manager.jpg": "https://via.placeholder.com/600x400/1a0524/f72585?text=Expense+Manager",
  "cloud-play-creator.jpg": "https://via.placeholder.com/600x400/1a0524/4cc9f0?text=Cloud+Play+Creator",
  "portfolio.jpg": "https://via.placeholder.com/600x400/1a0524/7209b7?text=Portfolio+Site",
  
  // Skill icons
  "react.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "babylon.svg": "https://www.babylonjs.com/img/favicon/apple-icon-76x76.png",
  "node.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "typescript.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "redux.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  "azure.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  "form.svg": "https://avatars.githubusercontent.com/u/53986236?s=200&v=4",
  "mui.svg": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
}; 