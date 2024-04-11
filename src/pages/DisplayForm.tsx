import { useState } from "react";
import { Button } from "@/components/ui/button";
import styled from "styled-components";
import { categories as initialCategories } from "@/lib/category";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit2 } from "lucide-react";
import AddQuestionButton from "./AddQuestionButton";
import CategoryManager from "./CategoryComp";

const StyledText = styled.div`
  font-family: "Syne", sans-serif;
`;

interface Selections {
  [key: string]: string | null;
}

interface Props {
  adminMode: boolean;
}

const DisplayForm: React.FC<Props> = ({ adminMode }) => {
  const [categories, setCategories] = useState(initialCategories);
  const [selections, setSelections] = useState<Selections>({});

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedQuestionLabel, setEditedQuestionLabel] = useState("");
  const [editedOptions, setEditedOptions] = useState<string[]>([]);
  const [editCategoryIndex, setEditCategoryIndex] = useState(-1);
  const [editQuestionIndex, setEditQuestionIndex] = useState(-1);

  const handleSelection = (question: string, option: string) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [question]: option,
    }));
  };

  const handleSubmit = () => {
    setSelections((currentSelections) => {
      // console.log(currentSelections);

      // Generate a unique ID for the form data
      const formId = `form_${Date.now()}`;

      const formData = JSON.stringify(currentSelections);

      // Save the form data in local storage
      localStorage.setItem(formId, formData);

      // Reset the selections
      return {
        question1_1: null,
        question1_2: null,
        question2_1: null,
        question2_2: null,
        question2_3: null,
        question3_1: null,
        question3_2: null,
      };
    });
  };

  const resetSelections = () => {
    setSelections({
      question1_1: null,
      question1_2: null,
      question2_1: null,
      question2_2: null,
      question2_3: null,
      question3_1: null,
      question3_2: null,
    });
  };

  const openEditDialog = (categoryIndex: number, questionIndex: number) => {
    const { label, options } =
      categories[categoryIndex].questions[questionIndex];
    setEditedQuestionLabel(label);
    setEditedOptions(options);
    setEditCategoryIndex(categoryIndex);
    setEditQuestionIndex(questionIndex);
    setShowEditDialog(true);
  };

  const handleEditQuestion = () => {
    if (editCategoryIndex !== -1 && editQuestionIndex !== -1) {
      const updatedCategories = [...categories];
      updatedCategories[editCategoryIndex].questions[editQuestionIndex].label =
        editedQuestionLabel;
      updatedCategories[editCategoryIndex].questions[
        editQuestionIndex
      ].options = editedOptions;
      setCategories(updatedCategories);
      setShowEditDialog(false);
    }
  };

  const cancelEditQuestion = () => {
    setShowEditDialog(false);
  };

  const handleEditOption = (optionIndex: number, newOptionValue: string) => {
    const updatedOptions = [...editedOptions];
    updatedOptions[optionIndex] = newOptionValue;
    setEditedOptions(updatedOptions);
  };

  const handleAddQuestion = (
    question: string,
    options: string[],
    icon: any, // Add 'icon' parameter here
    categoryIndex: number // Add 'categoryIndex' parameter here
  ) => {
    const newQuestion = {
      key: `question_${Date.now()}`,
      icon: icon,
      label: question,
      options: options,
    };
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].questions.push(newQuestion);

    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  const handleAddOption = () => {
    setEditedOptions((prevOptions) => [...prevOptions, ""]);
  };

  // Function to check if at least one option has been selected
  const isSubmitEnabled = () => {
    return Object.values(selections).some((value) => value !== null);
  };

  return (
    <div className='max-w-4xl mx-auto my-4'>
      <StyledText className='text-4xl font-bold mb-6'>
        {adminMode ? "Configure Form" : "Display Form"}
      </StyledText>
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className='mb-8'>
          <StyledText className='text-xl font-semibold mb-3'>
            {category.title}
          </StyledText>
          <div className='mb-8 border border-gray-400 rounded p-6'>
            {category.questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className='mb-4 flex flex-col md:flex-row  items-start'
              >
                {question.icon && <question.icon className='inline mr-6' />}

                <div className='mb-2 md:mb-0 md:mr-12 md:font-bold'>
                  {question.label}
                </div>
                <div className='flex flex-wrap justify-center md:justify-start w-full'>
                  {question.options.map((option, optionIndex) => (
                    <Button
                      key={optionIndex}
                      className={`border-2 mb-2 mr-2 ${
                        selections[question.label] === option
                          ? "bg-blue-500"
                          : ""
                      }`}
                      variant='outline'
                      onClick={() => handleSelection(question.label, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {adminMode && (
                  <Button
                    className='ml-auto'
                    onClick={() => openEditDialog(categoryIndex, questionIndex)}
                  >
                    <Edit2 size={16} />
                  </Button>
                )}
              </div>
            ))}
            {/*  add question button */}
            {adminMode && (
              <AddQuestionButton
                onAddQuestion={(question, options, icon) =>
                  handleAddQuestion(question, options, icon, categoryIndex)
                }
              />
            )}
          </div>
        </div>
      ))}

      {/* Category */}
      <CategoryManager
        categories={categories}
        setCategories={setCategories}
        adminMode={adminMode}
      />

      <div className='flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-8'>
        <Button onClick={handleSubmit} disabled={!isSubmitEnabled()}>
          Submit
        </Button>
        <Button variant='outline' onClick={resetSelections}>
          Cancel
        </Button>
      </div>

      <Dialog open={showEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
          </DialogHeader>
          <Input
            value={editedQuestionLabel}
            onChange={(e) => setEditedQuestionLabel(e.target.value)}
          />
          <DialogTitle>Edit Options</DialogTitle>
          {editedOptions.map((option, optionIndex) => (
            <Input
              key={optionIndex}
              value={option}
              onChange={(e) => handleEditOption(optionIndex, e.target.value)}
            />
          ))}

          <div className='mt-4 flex justify-end'>
            <Button onClick={handleAddOption}>Add Option</Button>
            <Button className='mx-5' onClick={handleEditQuestion}>
              Save
            </Button>
            <Button variant='outline' onClick={cancelEditQuestion}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DisplayForm;
