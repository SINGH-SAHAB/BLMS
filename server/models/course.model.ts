import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";

export interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies: IComment[];
}

interface IReview extends Document {
  user: IUser;
  rating?: number;
  comment: string;
  commentReplies?: IReview[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface TestOption extends Document {
  optionText: string;
  isCorrect: boolean;
}

interface INote extends Document{
  public_id: string;
  url: string;
}

interface ITestSubmit extends Document {
  user: IUser;
  question: string;
  options: TestOption[];
  currectAnswer: string;
  marks: number;
}
interface ITestQuestion extends Document {
  question: string;
  options: TestOption[];
  currectAnswer: string;
  marks: number;
}

interface Inotes extends Document {
  courseName: string;
  title: string;
  notes: INote[];
}

interface Isections extends Document {
 // tests: any;
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}

export interface ICourse extends Document {
  name: string;
  description: string;
  categories: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  targetAudience:{title: string}[];
  MaterialIncluded:{title: string}[];
  reviews: IReview[];
  sections: Isections[];
  ratings?: number;
  purchased: number;
}

const reviewSchema = new Schema<IReview>(
  {
    user: Object,
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [Object],
  },
  { timestamps: true }
);

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const testQuestionSchema = new Schema<ITestQuestion>({
  question: String,
  // options: [Object],
  options: [{ optionText: String, isCorrect: Boolean }],
  currectAnswer: String,
  marks: Number,
});

const noteSchema = new Schema<INote>({
  public_id:String,
  url:String,
})

const notesSchema = new Schema<Inotes>({
  courseName: String,
  title: String,
  notes: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

const testAnswerSchema = new Schema<ITestSubmit>({
  user: Object,
  question: String,
  // options: [Object],
  options: [{ optionText: String, isCorrect: Boolean }],
  currectAnswer: String,
  marks: Number,
});
const commentSchema = new Schema<IComment>(
  {
    user: Object,
    question: String,
    questionReplies: [Object],
  },
  { timestamps: true }
);

const sectionsSchema = new Schema<Isections>({
  videoUrl: String,
  videoThumbnail: Object,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
  
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
      // default: "web development",
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tags: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
      required: true,
    },
    benefits: [{ title:{type: String}  }],
    prerequisites: [{ title: {type: String} }],
    targetAudience:[{title: {type: String}}],
    MaterialIncluded:[{title: {type: String} }],
    reviews: [reviewSchema],
    sections: [sectionsSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

export default CourseModel;

////----------------------------___-------------------------------------------------------------------------------------------------------------------------------------------------
//__________________________________________________________________________________________________________________________________________________________________________________

// import mongoose, { Document, Model, Schema } from "mongoose";
// import { IUser } from "./user.model";
// interface IComment extends Document {
//   user: IUser;
//   question: string;
//   questionReplies: IComment[];
// }

// interface IReview extends Document {
//   user: IUser;
//   rating?: number;
//   comment: string;
//   commentReplies?: IReview[];
// }

// interface ILink extends Document {
//   title: string;
//   url: string;
// }

// interface ITestQuestion extends Document {
//   question: string;
//   options: string[];
//   correctAnswer: string;
//   courseId: string;
//   videoId: string;
// }

// const testQuestionSchema = new Schema<ITestQuestion>({
//   question: String,
//   options: [String],
//   correctAnswer: String,
//   courseId: String,
//   videoId: String,
// });

// const TestModel: Model<ITestQuestion> = mongoose.model("Test", testQuestionSchema);

// interface ICourseData extends Document {
//   title: string;
//   description: string;
//   videoUrl: string;
//   videoThumbnail: object;
//   videoSection: string;
//   videoLength: number;
//   videoPlayer: string;
//   links: ILink[];
//   suggestion: string;
//   questions: IComment[];
//   tests: ITestQuestion[];
// }

// const linkSchema = new Schema<ILink>({
//   title: String,
//   url: String,
// });

// const commentSchema = new Schema<IComment>({
//   user: Object,
//   question: String,
//   questionReplies: [Object],
// }, { timestamps: true });

// const courseDataSchema = new Schema<ICourseData>({
//   videoUrl: String,
//   videoThumbnail: Object,
//   title: String,
//   videoSection: String,
//   description: String,
//   videoLength: Number,
//   videoPlayer: String,
//   links: [linkSchema],
//   suggestion: String,
//   questions: [commentSchema],
//   tests: [testQuestionSchema],
// }, { timestamps: true });

// interface ICourse extends Document {
//   name: string;
//   description: string;
//   categories: string;
//   price: number;
//   estimatedPrice?: number;
//   thumbnail: object;
//   tags: string;
//   level: string;
//   demoUrl: string;
//   benefits: { title: string }[];
//   prerequisites: { title: string }[];
//   reviews: IReview[];
//   courseData: ICourseData[];
//   ratings?: number;
//   purchased: number;
// }

// const reviewSchema = new Schema<IReview>({
//   user: Object,
//   rating: {
//     type: Number,
//     default: 0,
//   },
//   comment: String,
//   commentReplies: [Object],
// }, { timestamps: true });

// const courseSchema = new Schema<ICourse>({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   categories: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   estimatedPrice: {
//     type: Number,
//   },
//   thumbnail: {
//     public_id: {
//       type: String,
//     },
//     url: {
//       type: String,
//     },
//   },
//   tags: {
//     type: String,
//     required: true,
//   },
//   level: {
//     type: String,
//     required: true,
//   },
//   demoUrl: {
//     type: String,
//     required: true,
//   },
//   benefits: [{ title: String }],
//   prerequisites: [{ title: String }],
//   reviews: [reviewSchema],
//   courseData: [courseDataSchema],
//   ratings: {
//     type: Number,
//     default: 0,
//   },
//   purchased: {
//     type: Number,
//     default: 0,
//   },
// }, { timestamps: true });

// const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

// export default CourseModel;
// export { ICourse, ICourseData, ILink, IComment, IReview, ITestQuestion };

////-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//__________________________________________________________________________________________________________________________________________________________________________________

// import mongoose, { Document, Model, Schema } from "mongoose";
// import { IUser } from "./user.model";

// interface IComment extends Document {
//   user: IUser;
//   question: string;
//   questionReplies: IComment[];
// }

// interface IReview extends Document {
//   user: IUser;
//   rating?: number;
//   comment: string;
//   commentReplies?: IReview[];
// }

// interface ILink extends Document {
//   title: string;
//   url: string;
// }

// interface ITestQuestion extends Document {
//   question: string;
//   options: string[];
//   correctAnswer: string;
//   courseId: string;
//   videoId: string;
// }

// const testQuestionSchema = new Schema<ITestQuestion>({
//   question: String,
//   options: [String],
//   correctAnswer: String,
//   courseId: String,
//   videoId: String,
// });

// interface ICourseData extends Document {
//   title: string;
//   description: string;
//   videoUrl: string;
//   videoThumbnail: object;
//   videoSection: string;
//   videoLength: number;
//   videoPlayer: string;
//   links: ILink[];
//   suggestion: string;
//   questions: IComment[];
//   tests: ITestQuestion[];   // Include the ITestQuestion schema here
// }

// const linkSchema = new Schema<ILink>({
//   title: String,
//   url: String,
// });

// const commentSchema = new Schema<IComment>({
//   user: Object,
//   question: String,
//   questionReplies: [Object],
// }, { timestamps: true });

// const courseDataSchema = new Schema<ICourseData>({
//   videoUrl: String,
//   videoThumbnail: Object,
//   title: String,
//   videoSection: String,
//   description: String,
//   videoLength: Number,
//   videoPlayer: String,
//   links: [linkSchema],
//   suggestion: String,
//   questions: [commentSchema],
//   tests: [testQuestionSchema],  // Include the ITestQuestion schema here
// }, { timestamps: true });

// interface ICourse extends Document {
//   name: string;
//   description: string;
//   categories: string;
//   price: number;
//   estimatedPrice?: number;
//   thumbnail: object;
//   tags: string;
//   level: string;
//   demoUrl: string;
//   benefits: { title: string }[];
//   prerequisites: { title: string }[];
//   reviews: IReview[];
//   courseData: ICourseData[];
//   ratings?: number;
//   purchased: number;
// }

// const reviewSchema = new Schema<IReview>({
//   user: Object,
//   rating: {
//     type: Number,
//     default: 0,
//   },
//   comment: String,
//   commentReplies: [Object],
// }, { timestamps: true });

// const courseSchema = new Schema<ICourse>({
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   categories: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   estimatedPrice: {
//     type: Number,
//   },
//   thumbnail: {
//     public_id: {
//       type: String,
//     },
//     url: {
//       type: String,
//     },
//   },
//   tags: {
//     type: String,
//     required: true,
//   },
//   level: {
//     type: String,
//     required: true,
//   },
//   demoUrl: {
//     type: String,
//     required: true,
//   },
//   benefits: [{ title: String }],
//   prerequisites: [{ title: String }],
//   reviews: [reviewSchema],
//   courseData: [courseDataSchema],
//   ratings: {
//     type: Number,
//     default: 0,
//   },
//   purchased: {
//     type: Number,
//     default: 0,
//   },
// }, { timestamps: true });

// const CourseModel: Model<ICourse> = mongoose.model("Course", courseSchema);

// export default CourseModel;
// export { ICourse, ICourseData, ILink, IComment, IReview, ITestQuestion };
