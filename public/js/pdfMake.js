$(document).ready(function () {

    var image = $("#profile-pic");
    if (image.attr("src") == "null") {
        image.hide();
    } else {
        image.show();
    }

    $("#printPDF1").off();
    $("#printPDF1").on("click", function (event) {
        event.preventDefault();
        $.get("/print/all", function (data) {
            var experience = data[0].Experiences;
            var languages = data[0].Languages;
            var skills = data[0].Skills;
            var studies = data[0].Studies;
            var generalInfo = data[0].GeneralInfos;
            var experienceArr = [];
            var studiesArr = [];
            var skillsArr = [];
            var languagesArr = [];
            for (var x = 0; x < experience.length; x++) {
                var experiencesPrint = [
                    {
                        columns: [
                            {
                                width: 140, alignment: 'center',
                                text: "\n" + experience[x].entryDate + "-" + experience[x].leaveDate,
                            },
                            {
                                width: '*',
                                text: "\n" + experience[x].company, bold: true,
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                width: 140, alignment: 'center',
                                text: experience[x].city + ", " + experience[x].state,
                            },
                            {
                                width: '*',
                                text: "Title: " + experience[x].jobTitle, italics: true,
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                width: 140,
                                text: "",
                            },
                            {
                                width: '*',
                                text: experience[x].description,
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                width: 160,
                                text: "",
                            },
                            {
                                width: "*",
                                ul: [
                                    experience[x].task1,
                                    experience[x].task2,
                                    experience[x].task3,
                                    experience[x].task4,
                                    experience[x].task5
                                ], fontSize: 10
                            }]
                    }
                ]
                experienceArr.push(experiencesPrint);
            }

            for (var x = 0; x < studies.length; x++) {
                var studiesPrint = [
                    {
                        columns: [
                            {
                                width: 140, alignment: 'center',
                                text: "\n" + studies[x].entryDateSchool + "-" + studies[x].leaveDateSchool,
                            },
                            {
                                width: '*',
                                text: "\n" + studies[x].school, bold: true,
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                width: 140, alignment: 'center',
                                text: studies[x].citySchool + ", " + studies[x].stateSchool,
                            },
                            {
                                width: '*',
                                text: studies[x].degree, italics: true,
                            }
                        ]
                    }
                ]
                studiesArr.push(studiesPrint);
            }

            for (var x = 0; x < skills.length; x++) {
                var skillsPrint = [
                    {
                        width: "*", alignment: 'left', bold: false, fontSize: 12,
                        text: skills[x].skillName + ": " + skills[x].skillLevel,
                    }
                ]

                skillsArr.push(skillsPrint);
            }

            for (var x = 0; x < languages.length; x++) {
                var languagesPrint = [
                    {
                        width: "*", alignment: 'left', bold: false, fontSize: 12,
                        text: languages[x].language + ": " + languages[x].languageLevel,
                    }
                ]
                languagesArr.push(languagesPrint);
            }

            var docDefinition = {
                pageSize: "A4",
                info: {
                    title: "Style 1"
                },
                content: [
                    {
                        stack: [
                            generalInfo[0].name + "\n",
                            {
                                text: generalInfo[0].description +
                                    "\nPhone: " + generalInfo[0].phone + "         " +
                                    "Address: " + generalInfo[0].address +
                                    "\n" + "E-mail: " + data[0].email,
                                style: 'subheader'
                            },
                        ],
                        style: 'header'
                    },
                    {
                        text: '\nExperience', bold: true, fontSize: 14,

                    },
                    experienceArr,
                    {
                        text: '\nEducation', bold: true, fontSize: 14,

                    },
                    studiesArr,
                    {
                        columns: [
                            {
                                width: "*", alignment: 'left', bold: true, fontSize: 14,
                                text: "\nSkills",
                            },
                            {
                                width: '*', alignment: 'left', bold: true, fontSize: 14,
                                text: "\nLanguages",
                            }
                        ]
                    },
                    {
                        columns: [
                            skillsArr,
                            languagesArr
                        ]
                    }
                ],
                margin: [0, 0, 0, 0],
                styles: {
                    header: {
                        fontSize: 14,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 0, 0, 00]
                    },
                    subheader: {
                        fontSize: 12,
                        bold: false,
                    }
                },
                defaultStyle: {
                    columnGap: 20
                }
            }
            pdfMake.createPdf(docDefinition).open();
            pdfMake.createPdf(docDefinition).download("Style 1.pdf");
        });
    });

    $("#printPDF2").off();
    $("#printPDF2").on("click", function (event) {
        event.preventDefault();
        $.get("/print/all", function (data) {
            var experience = data[0].Experiences;
            var languages = data[0].Languages;
            var skills = data[0].Skills;
            var studies = data[0].Studies;
            var generalInfo = data[0].GeneralInfos;
            var experienceArr = [];
            var studiesArr = [];
            var skillsArr = [];
            var languagesArr = [];

            for (var x = 0; x < experience.length; x++) {
                var experiencesPrint = [
                    {
                        style: 'tableExperience',
                        table: {
                            widths: [50, 50, 140, 120, 100],
                            body: [
                                [
                                    { text: 'Start', bold: true, fontSize: 10 },
                                    { text: 'End', bold: true, fontSize: 10 },
                                    { text: 'Position', bold: true, fontSize: 10 },
                                    { text: 'Company Name', bold: true, fontSize: 10 },
                                    { text: 'Location', bold: true, fontSize: 10 },
                                ],
                                [
                                    { text: experience[x].entryDate, fontSize: 9 },
                                    { text: experience[x].leaveDate, fontSize: 9 },
                                    { text: experience[x].jobTitle, fontSize: 9 },
                                    { text: experience[x].company, fontSize: 9 },
                                    { text: experience[x].city + ", " + experience[x].state, fontSize: 9 }
                                ]
                            ]
                        }
                    },
                    {
                        style: 'tableExperience',
                        table: {
                            widths: [145, 345],
                            body: [
                                [
                                    { text: 'Description', bold: true, fontSize: 10 },
                                    { text: 'Tasks', bold: true, fontSize: 10 },
                                ],
                                [
                                    {
                                        text: experience[x].description,
                                        fontSize: 9
                                    },
                                    {
                                        ul: [
                                            { text: experience[x].task1, fontSize: 9 },
                                            { text: experience[x].task2, fontSize: 9 },
                                            { text: experience[x].task3, fontSize: 9 },
                                            { text: experience[x].task4, fontSize: 9 },
                                            { text: experience[x].task5, fontSize: 9 },
                                        ]
                                    },
                                ]
                            ]
                        }
                    }
                ]
                experienceArr.push(experiencesPrint);
            }

            for (var x = 0; x < studies.length; x++) {
                var studiesPrint = [
                    {
                        style: 'tableStudies',
                        table: {
                            widths: [50, 50, 140, 120, 100],
                            body: [
                                [
                                    { text: 'Start', bold: true, fontSize: 10 },
                                    { text: 'End', bold: true, fontSize: 10 },
                                    { text: 'Degree', bold: true, fontSize: 10 },
                                    { text: 'Institution Name', bold: true, fontSize: 10 },
                                    { text: 'Location', bold: true, fontSize: 10 },
                                ],
                                [
                                    { text: studies[x].entryDateSchool, fontSize: 9 },
                                    { text: studies[x].leaveDateSchool, fontSize: 9 },
                                    { text: studies[x].degree, fontSize: 9 },
                                    { text: studies[x].school, fontSize: 9 },
                                    { text: studies[x].citySchool + ", " + studies[x].stateSchool, fontSize: 9 },]
                            ]
                        }
                    }
                ]

                studiesArr.push(studiesPrint);
            }

            for (var x = 0; x < skills.length; x++) {
                var skillsPrint = [
                    {
                        columns: [
                            { text: skills[x].skillName, fontSize: 9 },
                            { text: skills[x].skillLevel, fontSize: 9 },
                        ]
                    }
                ]

                skillsArr.push(skillsPrint);
            }

            for (var x = 0; x < languages.length; x++) {
                var languagesPrint = [
                    {
                        columns: [
                            { text: languages[x].language, fontSize: 9 },
                            { text: languages[x].languageLevel, fontSize: 9 },
                        ]
                    }
                ]
                languagesArr.push(languagesPrint);
            }

            var docDefinition = {
                pageSize: "A4",
                info: {
                    title: "Style 2"
                },
                content: [
                    {
                        text: generalInfo[0].name,
                        alignment: 'center', fontSize: 16, bold: true
                    },
                    {
                        text: generalInfo[0].description,
                        alignment: 'center', fontSize: 12, bold: true
                    },
                    {
                        text: "Phone: " + generalInfo[0].phone + "        Address: " + generalInfo[0].address,
                        alignment: 'center', fontSize: 10
                    },
                    {
                        text: "E-mail: " + data[0].email,
                        alignment: 'center', fontSize: 10
                    },
                    {
                        text: '_______________________________________________________________',
                        fontSize: 18
                    },
                    { text: "Professional Experience", bold: true, fontSize: 12 }, experienceArr,
                    {
                        text: '_______________________________________________________________',
                        fontSize: 18
                    },
                    { text: "Education", bold: true, fontSize: 12 }, studiesArr,
                    {
                        text: '_______________________________________________________________',
                        fontSize: 18
                    },
                    {
                        columns: [
                            { text: "Skills\n\n", bold: true, fontSize: 12 },
                            { text: "Languages\n\n", bold: true, fontSize: 12 },
                        ]
                    },
                    {
                        columns: [skillsArr, languagesArr]
                    }
                ],
                styles: {
                    tableExperience: { margin: [0, 2, 0, 4] },
                    tableStudies: { margin: [0, 1, 0, 2] }
                }
            };

            pdfMake.createPdf(docDefinition).open();
            pdfMake.createPdf(docDefinition).download("Style 2.pdf");
        });
    });
});