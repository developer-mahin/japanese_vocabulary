import { Router } from "express";
import { VocabularyController } from "./vocabulary.controller";

const router = Router();

router.post("/create-vocabulary", VocabularyController.createVocabulary);
router.get("/all-vocabularies", VocabularyController.getAllVocabularies);
router.get("/my-vocabularies", VocabularyController.getMyVocabularies);
router.get("/single-vocabulary/:id", VocabularyController.getSingleVocabulary);
router.patch("/update-vocabulary/:id", VocabularyController.updateVocabulary);
router.delete("/delete-vocabulary/:id", VocabularyController.deleteVocabulary);


export const VocabularyRoutes = router;
