import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import * as Icons from "lucide-react";

interface AddQuestionButtonProps {
  onAddQuestion: (
    question: string,
    options: string[],
    categoryIndex: number,
    icon: string
  ) => void;
  categoryIndex: number;
}

const AddQuestionButton: React.FC<AddQuestionButtonProps> = ({
  onAddQuestion,
  categoryIndex,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [icon, setIcon] = useState("");

  const handleAddClick = () => {
    setShowDialog(true);
  };

  const handleAddOption = () => {
    setOptions((prevOptions) => [...prevOptions, ""]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  const handleAddNewQuestion = () => {
    if (question.trim() !== "" && options.every((opt) => opt.trim() !== "")) {
      onAddQuestion(question, options, categoryIndex, icon);
      setShowDialog(false);
      setQuestion("");
      setOptions([""]);
      setIcon("");
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prevOptions) =>
      prevOptions.map((opt, i) => (i === index ? value : opt))
    );
  };

  const handleIconChange = (value: string) => {
    // Capitalize the first letter of the input value
    const capitalizedIconName = value.charAt(0).toUpperCase() + value.slice(1);
    setIcon(capitalizedIconName); // Set the icon name to state
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setQuestion("");
    setOptions([""]);
    setIcon("");
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent
      ? React.createElement(IconComponent, { size: 16 })
      : null;
  };

  return (
    <>
      <Button onClick={handleAddClick}>Add Question</Button>
      <Dialog open={showDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
          </DialogHeader>
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder='Enter question'
            required
          />
          <Input
            value={icon}
            onChange={(e) => handleIconChange(e.target.value)}
            placeholder='Enter icon name (e.g., IconName)'
          />
          {renderIcon(icon)}

          {options.map((opt, index) => (
            <div key={index} className='flex'>
              <Input
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                required
              />
              <Button
                size='sm'
                className='mx-2'
                onClick={() => handleRemoveOption(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={handleAddOption}>Add Option</Button>
          <div className='flex ml-2 gap-6 w-full'>
            <Button onClick={handleAddNewQuestion}>Add</Button>
            <Button onClick={handleCloseDialog}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddQuestionButton;
