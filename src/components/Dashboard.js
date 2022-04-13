import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import supabase from "./helpers/supabase";
import { useAuth } from "./hooks/useAuth";
import { Loader } from "./shared/Loader";
import Alert from "./shared/Alert";
function Dashboard() {
	const [submitting, setSubmitting] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [msg, setMsg] = React.useState("");
	const { user } = useAuth();
	React.useEffect(() => {
		document.title = `${document.title} - Dashboard`;
	}, []);
  const [activities,setActivities] = React.useState([]);
	const checkinSchema = Yup.object().shape({
		backpain: Yup.string().required("Required"),
		chestpain: Yup.string().required("Required"),
		cough: Yup.string().required("Required"),
		fever: Yup.string().required("Required"),
		headache: Yup.string().required("Required"),
		sorethroat: Yup.string().required("Required"),
		shortnessofbreath: Yup.string().required("Required"),
		sneezing: Yup.string().required("Required"),
		tiredness: Yup.string().required("Required"),
		sleepduration: Yup.number("Numbers only allowed").required("Required"),
		morningexerciseduration: Yup.number("Numbers only allowed").required(
			"Required"
		),
		intensityofexercise: Yup.string(),
		breakfast: Yup.string().required("Required"),
		breakfastdetails: Yup.string(),
	});
	const handleSubmit = async (values, { resetForm }) => {
		setSubmitting(true);
		const date = new Date();
		date.toLocaleString("en-Us", { timezone: "Africa/Kampala" });
		values["checkin_at"] = date;

		try {
			const { error } = await supabase
				.from("check_ins_out")
				.insert([{ meta: values, user_id: user.id }]);

			if (error) {
				console.log(error);
				setSubmitting(false);
				setError(true);
				setMsg("Something went wrong!");
			} else {
				setSubmitting(false);
				setError(false);
				setMsg("Checked In Successfully");
				// resetForm();
			}
		} catch (error) {
			console.log(error);
			setSubmitting(false);
			setError(true);
			setMsg("Something went wrong");
		}
	};

	if (submitting) {
		return <Loader title="Checking in..." body="Please wait..." />;
	}

	return (
		<section>
			<header>
				<h1>Dashboard</h1>
				{error && msg && (
					<Alert
						className="bg-red-100 border border-red-700 text-red-700 rounded-md p-2"
						msg={msg}
					/>
				)}
				{!error && msg && (
					<Alert
						className="bg-green-100 border border-green-700 text-green-700 rounded-md p-2"
						msg={msg}
					/>
				)}
			</header>
			<main className="grid gap-4 grid-cols-2 py-10">
				<div className="p-8 rounded-xl bg-white border dark:bg-gray-900 dark:border-gray-800">
					<h4 className="mb-5 text-xl text-gray-900 font-bold dark:text-gray-300">
						Start by Checking in!
					</h4>
					<p className="text-sm text-gray-500 mb-5">
						The information will collect helps discover ways of
						supporting teammates you and help you work effectively.{" "}
						<br /> This information will not be shared with anyone.
					</p>
					<Formik
						initialValues={{
							backpain: "",
							chestpain: "",
							cough: "",
							fever: "",
							headache: "",
							sorethroat: "",
							shortnessofbreath: "",
							sneezing: "",
							tiredness: "",
							sleepduration: "",
							morningexerciseduration: "",
							intensityofexercise: "",
							breakfast: "",
							breakfastdetails: "",
						}}
						validationSchema={checkinSchema}
						onSubmit={handleSubmit}>
						{({ errors, touched }) => (
							<Form>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have backpain?
									</p>
									<div className="grid grid-cols-3 gap-x-5">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="backpain"
												id="backpain_yes"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="backpain_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="backpain"
												id="backpain_no"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="backpain_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="backpain"
												id="backpain_notsure"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="backpain_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.backpain && touched.backpain && (
										<p className="text-red-500 text-xs italic">
											{errors.backpain}
										</p>
									)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have chestpain?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="chestpain"
												id="chestpain_yes"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="chestpain_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="chestpain"
												id="chestpain_no"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="chestpain_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="chestpain"
												id="chestpain_notsure"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="chestpain_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.chestpain && touched.chestpain && (
										<p className="text-red-500 text-xs italic">
											{errors.chestpain}
										</p>
									)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have a cough?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="cough"
												id="cough_yes"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="cough_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="cough"
												id="cough_no"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="cough_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="cough"
												id="cough_notsure"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="cough_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.cough && touched.cough && (
										<p className="text-red-500 text-xs italic">
											{errors.cough}
										</p>
									)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have a fever?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="fever"
												id="fever_yes"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="fever_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="fever"
												id="fever_no"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="fever_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="fever"
												id="fever_notsure"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="fever_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.fever && touched.fever && (
										<p className="text-red-500 text-xs italic">
											{errors.fever}
										</p>
									)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have a headache?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="headache"
												id="headache_yes"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="headache_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="headache"
												id="headache_no"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="headache_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="headache"
												id="headache_notsure"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="headache_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.headache && touched.headache && (
										<p className="text-red-500 text-xs italic">
											{errors.headache}
										</p>
									)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have a sore throat?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="sorethroat"
												id="sorethroat_yes"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="sorethroat_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="sorethroat"
												id="sorethroat_no"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="sorethroat_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="sorethroat"
												id="sorethroat_notsure"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="sorethroat_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.sorethroat &&
										touched.sorethroat && (
											<p className="text-red-500 text-xs italic">
												{errors.sorethroat}
											</p>
										)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Do you have a shortness of breath?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="shortnessofbreath"
												id="shortnessofbreath_yes"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="shortnessofbreath_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="shortnessofbreath"
												id="shortnessofbreath_no"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="shortnessofbreath_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="shortnessofbreath"
												id="shortnessofbreath_notsure"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="shortnessofbreath_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.shortnessofbreath &&
										touched.shortnessofbreath && (
											<p className="text-red-500 text-xs italic">
												{errors.shortnessofbreath}
											</p>
										)}
								</div>
								<div className="py-2">
									<p className="mb-2 text-sm font-semibold">
										Are you sneezing?
									</p>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="sneezing"
												id="sneezing_yes"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="sneezing_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="sneezing"
												id="sneezing_no"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="sneezing_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="sneezing"
												id="sneezing_notsure"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="sneezing_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.sneezing && touched.sneezing && (
										<p className="text-red-500 text-xs italic">
											{errors.sneezing}
										</p>
									)}
								</div>
								<div className="py-2">
									<label className="mb-2 text-sm font-semibold block">
										Do you feel tired?
									</label>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="tiredness"
												id="tiredness_yes"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="tiredness_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="tiredness"
												id="tiredness_no"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="tiredness_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Not sure"
												name="tiredness"
												id="tiredness_notsure"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="tiredness_notsure">
												Not sure
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.sneezing && touched.sneezing && (
										<p className="text-red-500 text-xs italic">
											{errors.sneezing}
										</p>
									)}
								</div>
								<div className="py-2 ">
									<label
										className="mb-2 text-sm font-semibold block"
										htmlFor="sleepduration">
										How long did you sleep last night?
									</label>
									<Field
										className="outline-0 p-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 w-full rounded-lg"
										type="text"
										name="sleepduration"
										id="sleepduration"
									/>
									{errors.sleepduration &&
										touched.sleepduration && (
											<p className="text-red-500 text-xs italic">
												{errors.sleepduration}
											</p>
										)}
								</div>
								<div className="py-2 ">
									<label
										className="block mb-2 text-sm font-semibold"
										htmlFor="morningexerciseduration">
										How long did you exercise in the
										morning?
									</label>
									<Field
										className="outline-0 p-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 w-full rounded-lg"
										type="text"
										name="morningexerciseduration"
										id="morningexerciseduration"
									/>
									{errors.morningexerciseduration &&
										touched.morningexerciseduration && (
											<p className="text-red-500 text-xs italic">
												{errors.morningexerciseduration}
											</p>
										)}
								</div>
								<div className="py-2">
									<label
										className="block mb-2 text-sm font-semibold"
										htmlFor="intensityofexercise">
										How do you describe the intensity of the
										excercise?
									</label>
									<Field
										className="p-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 w-full rounded-lg"
										as="select"
										name="intensityofexercise"
										id="intensityofexercise">
										<option value="">- Select -</option>
										<option value="Moderate">
											Moderate
										</option>
										<option value="Intense">Intense</option>
										<option value="Not sure">
											Not sure
										</option>
									</Field>
								</div>
								<div className="py-2">
									<label className="mb-2 text-sm font-semibold block">
										Did you have breakfast?
									</label>
									<div className="grid grid-cols-3 gap-x-5 ">
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="Yes"
												name="breakfast"
												id="breakfast_yes"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="breakfast_yes">
												Yes
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👍
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="No"
												name="breakfast"
												id="breakfast_no"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="breakfast_no">
												No
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												👎
											</div>
										</div>
										<div className="relative">
											<Field
												className="sr-only peer"
												type="radio"
												value="maybe"
												name="breakfast"
												id="breakfast_maybe"
											/>
											<label
												className="flex p-2 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-1 peer-checked:border-transparent dark:hover:bg-gray-600 dark:hover:border-gray-500"
												htmlFor="breakfast_maybe">
												Maybe
											</label>
											<div className="absolute hidden w-5 h-2 peer-checked:block top-2 right-3">
												🤔
											</div>
										</div>
									</div>
									{errors.breakfast && touched.breakfast && (
										<p className="text-red-500 text-xs italic">
											{errors.breakfast}
										</p>
									)}
								</div>
								<div className="py-2">
									<label
										className="mb-2 text-sm font-semibold block"
										htmlFor="breakfastdetails">
										What did you eat for breakfast?
									</label>
									<Field
										className="p-3 outline-0 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border border-gray-300 w-full rounded-lg"
										as="textarea"
										name="breakfastdetails"
										id="breakfastdetails"
									/>
								</div>
								<div className="pt-8">
									<button
										className="px-4 py-1 transition bg-white hover:-translate-y-1 hover:bg-orange-100 duration-300 mx-auto max-w-md rounded-full border border-orange-500 dark:border-gray-700 dark:text-gray-500"
										type="submit">
										Check in
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<div>
          <h1>Today's activities</h1>
          <ul>
            {activities.map((activity) => (
              <li key={activity.id}>
                <div className="flex">
                  {activity.workon}
                  {activity.workwith}
                  {activity.priority}
                  {activity.project}
                  </div>
                  </li>
            ))}
          </ul>
					<Formik
						initialValues={{
              workon:"",
							workwith: "",
							priority: "",
							project: "",
              moredetails:""
						}}
            onSubmit={(values, { setSubmitting }) => {
              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   setSubmitting(false);
              // }, 400);
              setActivities([...activities, values]);
            }}
            >
						{({ isSubmitting, isValid }) => (
							<Form>
								<div className="py-2">
									<label>What are you gonna work on?</label>
									<Field
										placeholder="What are you gonna work on?"
										className="p-2 appearance-none leading-tight outline-0 bg-gray-100 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-700 dark:focus:bg-gray-600 dark:focus:border-gray-500"
										type="text"
										name="workon"
									/>
								</div>
								<div className="py-2">
									<label>What will you work on Today?</label>
									<Field
										as="select"
										name="workwith"
										className="p-2 appearance-none leading-tight outline-0 bg-gray-100 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-700 dark:focus:bg-gray-600 dark:focus:border-gray-500">
										<option value="">- Select -</option>
										<option value="John">John</option>
										<option value="David">David</option>
										<option value="Charles">Charles</option>
									</Field>
								</div>
								<div className="py-2">
									<label>Do you want to add more details</label>
									<Field
										as="textarea"
										name="moredetials"
										className="p-2 appearance-none leading-tight outline-0 bg-gray-100 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-700 dark:focus:bg-gray-600 dark:focus:border-gray-500" />
								</div>
								<div className="py-2">
									<label>Priority</label>
									<Field
										as="select"
										name="priority"
										className="p-2 appearance-none leading-tight outline-0 bg-gray-100 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-700 dark:focus:bg-gray-600 dark:focus:border-gray-500">
										<option value="">- Arrange -</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
									</Field>
								</div>
								<div className="py-2">
									<label>On what project?</label>
									<Field
										as="select"
										name="project"
										className="p-2 appearance-none leading-tight outline-0 bg-gray-100 border border-gray-300 w-full rounded-lg focus:border-orange-400 focus:bg-white focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-700 dark:focus:bg-gray-600 dark:focus:border-gray-500">
										<option value="">
											- Select Project -
										</option>
										<option value="Tube App">
											Tube App
										</option>
										<option value="Ablestate Workspace">
											Ablestate Workspace
										</option>
									</Field>
								</div>
								<button
									type="submit"
									className="px-4 py-1 transition bg-white hover:-translate-y-1 hover:bg-orange-100 duration-300 mx-auto max-w-md rounded-full border border-orange-500 dark:border-gray-700 dark:text-gray-500">
									Add to todo
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</main>
		</section>
	);
}

export default Dashboard;
