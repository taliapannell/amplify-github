import "./FeedbackDialog.scss";
import { useEffect, useState } from "react";
import GenericDialog from "./GenericDialog";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { selectSessionId, selectSub } from "../../services/redux/app.slice";
import {
  SessionFeedback,
  createSessionFeedback,
} from "../../types/appData/FeedbackData";
import { endSession } from "../../services/SessionServices";
import { useWebSocket } from "../../services/WebSocket";
import SubmitButton from "../Buttons/SubmitButton/SubmitButton";
import TextArea from "../TextArea/TextArea";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  ThemeProvider,
  styled,
} from "@mui/material";
import { muiTheme } from "../../types/theme_colors";

enum Helpfulness {
  Always = 5,
  Often = 4,
  Sometimes = 3,
  Rarely = 2,
  Never = 1,
}

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: muiTheme.palette.primary.main,
  },
});

const FeedbackDialog = ({ open, setOpen, onClose }: any) => {
  const { webSocket } = useWebSocket();
  const sessionId = useSelector(selectSessionId);
  const userId = useSelector(selectSub);

  // State variables for feedback form fields
  const [helpfulness, setHelpfulness] = useState<Helpfulness>(
    Helpfulness.Sometimes
  );
  const [helpfulnessComment, setHelpfulnessComment] = useState("");
  const [accuracy, setAccuracy] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [accuracyComment, setAccuracyComment] = useState("");
  const [easeOfUse, setEaseOfUse] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [easeOfUseComment, setEaseOfUseComment] = useState("");
  const [overallExperience, setOverallExperience] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [overallExperienceComment, setOverallExperienceComment] = useState("");
  const [improvements, setImprovements] = useState("");
  const [additionalSubjects, setAdditionalSubjects] = useState("");

  const clearFeedback = () => {
    setHelpfulness(Helpfulness.Sometimes);
    setHelpfulnessComment("");
    setAccuracy(3);
    setAccuracyComment("");
    setEaseOfUse(3);
    setEaseOfUseComment("");
    setOverallExperience(3);
    setOverallExperienceComment("");
    setImprovements("");
    setAdditionalSubjects("");
  };

  const sessionFeedback: SessionFeedback = {
    sessionId: sessionId,
    userId: userId,
    feedback: {
      question1: {
        rating: helpfulness,
        comment: helpfulnessComment,
      },
      question2: improvements,
      question3: additionalSubjects,
      question4: {
        rating: accuracy,
        comment: accuracyComment,
      },
      question5: {
        rating: easeOfUse,
        comment: easeOfUseComment,
      },
      question6: {
        rating: overallExperience,
        comment: overallExperienceComment,
      },
    },
  };

  const closeFeedback = () => {
    endSession(webSocket, sessionFeedback);
    clearFeedback();
    onClose();
  };

  const updateRating = (setter: React.Dispatch<React.SetStateAction<number>>, value: number) => {
    setter(value as 1 | 2 | 3 | 4 | 5);
  };

  return (
    <div>
      <ThemeProvider theme={muiTheme}>
        <GenericDialog
          title="Feedback"
          subtitle=""
          open={open}
          setOpen={setOpen}
          onClose={closeFeedback}
        >
          <div className="feedback-dialog-container">
            <div className="feedback-dialog-form-group">
              <div className="feedback-dialog-label">
                On a scale of 1-5, how helpful do you think this tool would be
                in supporting the resolution of Survivor Benefits Inquiries and
                why?
              </div>
              <div className="feedback-dialog-rating">
                <StyledRating
                  size="large"
                  value={helpfulness}
                  onChange={(_, newValue) => {
                    if (newValue !== null) {
                      updateRating(setHelpfulness, newValue);
                    }
                  }}
                />
              </div>
              <TextArea
                hint="Additional comments (optional)"
                value={helpfulnessComment}
                handleChange={(data) => setHelpfulnessComment(data)}
              />
            </div>

            <div className="feedback-dialog-form-group">
              <div className="feedback-dialog-label">
                What do you think could be changed or improved?
              </div> <br/>
              <TextArea
                hint="Response"
                value={improvements}
                handleChange={(data) => setImprovements(data)}
              />
            </div>

            <div className="feedback-dialog-form-group">
              <div className="feedback-dialog-label">
                What other subjects would you like to see covered by the
                chatbot?
              </div><br/>
              <TextArea
                hint="Response"
                value={additionalSubjects}
                handleChange={(data) => setAdditionalSubjects(data)}
              />
            </div>

            <div className="feedback-dialog-form-group">
              <div className="feedback-dialog-label">
                How accurate were the chatbot's responses?
              </div>
              <div className="feedback-dialog-rating">
                <StyledRating
                  size="large"
                  value={accuracy}
                  onChange={(_, newValue) => {
                    if (newValue !== null) {
                      updateRating(setAccuracy, newValue);
                    }
                  }}
                />
              </div>
              <TextArea
                hint="Response"
                value={accuracyComment}
                handleChange={(data) => setAccuracyComment(data)}
              />
            </div>

            <div className="feedback-dialog-form-group">
              <div className="feedback-dialog-label">
                How easy is it to log in and use the chatbot?
              </div>
              <div className="feedback-dialog-rating">
                <StyledRating
                  size="large"
                  value={easeOfUse}
                  onChange={(_, newValue) => {
                    if (newValue !== null) {
                      updateRating(setEaseOfUse, newValue);
                    }
                  }}
                />
              </div>
              <TextArea
                hint="Response"
                value={easeOfUseComment}
                handleChange={(data) => setEaseOfUseComment(data)}
              />
            </div>

            <div className="feedback-dialog-form-group">
              <div className="feedback-dialog-label">
                How would you rate your overall experience using the chatbot?
              </div>
              <div className="feedback-dialog-rating">
                <StyledRating
                  size="large"
                  value={overallExperience}
                  onChange={(_, newValue) => {
                    if (newValue !== null) {
                      updateRating(setOverallExperience, newValue);
                    }
                  }}
                />
              </div>
              <TextArea
                hint="Response"
                value={overallExperienceComment}
                handleChange={(data) => setOverallExperienceComment(data)}
              />
            </div>

            <div className="feedback-dialog-submit-button-container">
              <div className="feedback-dialog-submit-button">
                <SubmitButton handleClick={closeFeedback} text="Submit" />
              </div>
            </div>
          </div>
        </GenericDialog>
      </ThemeProvider>
    </div>
  );
};

export default FeedbackDialog;
