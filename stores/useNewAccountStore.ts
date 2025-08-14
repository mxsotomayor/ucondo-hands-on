import { AccountModel, AccountModelType } from "@/models";
import { newAccountSchema } from "@/schemas/newAccountSchema";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

type FormData = {
  name: string;
  code: string;
  releasable?: boolean;
  rootAccount?: AccountModel;
};

type Keys = keyof FormData;

type Errors = Partial<Record<Keys, string>>;

type FormState = {
  isSaving?: boolean;
  errors?: Errors;
  setErrors: (errors?: Partial<Errors>) => void;
  data?: Partial<FormData>;
  validate: () => boolean;
  setFields: (fields: Partial<FormData>) => void;
  clear: () => void;
  validateAndSave: () => Promise<{ success: boolean; errors?: string[] }>;
};

const newAccountStore = create<FormState>((set, get) => ({
  data: { name: "", code: "" },
  clear() {
    set(() => ({ data: { name: "", code: "" }, errors: undefined }));
  },
  validate: function () {
    // clearing errors
    set(() => ({
      errors: undefined,
    }));
    try {
      const formdata = get().data;
      const parsed = newAccountSchema.safeParse(formdata);
      if (!parsed.success) {
        let validationErrors: Errors = {};
        parsed.error.issues.forEach((issue) => {
          validationErrors[issue.path[0] as Keys] = issue.message;
        });
        set(() => ({
          errors: validationErrors,
        }));
        return false;
      }
      return true;
    } catch (e) {
      console.log("[Error] Error validating", e);
      return false;
    }
  },
  setErrors(errors) {
    set((state) => ({
      errors: errors ? { ...state.errors, ...errors } : undefined,
    }));
  },
  setFields: (data) => {
    set((state) => ({ data: { ...state.data, ...data } }));
    get().validate();
  },

  validateAndSave: async () => {
    return {
      success: get().validate(),
    };
  },
}));

export const useNewAccountStore = () => {
  return newAccountStore(useShallow((state) => ({ ...state })));
};
