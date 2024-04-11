import { useState, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Category {
  title: string;
  questions: any[]; // Define a more specific type if possible
}

interface CategoryManagerProps {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  adminMode: boolean;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  categories,
  setCategories,
  adminMode,
}) => {
  const [showAddCategoryDialog, setShowAddCategoryDialog] =
    useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");

  const handleAddCategory = () => {
    setShowAddCategoryDialog(true);
  };

  const handleSaveCategory = () => {
    if (categoryName.trim() === "") {
      alert("Category name cannot be empty.");
      return;
    }

    const newCategory: Category = {
      title: categoryName,
      questions: [],
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setCategoryName("");
    setShowAddCategoryDialog(false);
  };

  const cancelAddCategory = () => {
    setCategoryName("");
    setShowAddCategoryDialog(false);
  };

  return (
    <div>
      {adminMode && (
        <div className='flex justify-start'>
          <Button onClick={handleAddCategory}>Add Category</Button>
        </div>
      )}
      {/* Dialog for adding a new category */}
      <Dialog open={showAddCategoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <label className='font-bold' htmlFor='categoryName'>
            Category Name
          </label>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder='Enter category name'
          />
          <div className='mt-4 flex justify-end'>
            <Button className='mx-4' onClick={handleSaveCategory}>
              Save
            </Button>
            <Button variant='outline' onClick={cancelAddCategory}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManager;
