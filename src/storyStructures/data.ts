export const fullStory001 = '{"similarMovieIds":["def456","ghi789"],"structureElements":{"uuid1":{"subStructureElements":[],"characterAppearances":[],"id":"uuid1","oneLiner":"helloworld"}},"characters":{},"logLine":"A movie! That\'s full of stuff!","runtimeMin":100}';

export const diff001 = '[{"kind":"N","path":["logLine"],"rhs":"a movie"}]';
export const diff002 = '[{"kind":"N","path":["similarMovies","uuid2"],"rhs":{"id":"uuid2"}},{"kind":"A","path":["stories","uuid1","similarMovieIds"],"index":1,"item":{"kind":"N","rhs":"def456"}}]';

export const fullWorkspace001 = '{"similarMovies":{"uuid2":{"id":"uuid2","title":"Tenet","runtimeMin":123}},"structureTemplates":{},"stories":{"uuid1":{"similarMovieIds":["uuid2"],"structureElements":{},"characters":{},"logLine":"My new log line"}},"history":[{"userEmail":"jon.simpkins@gmail.com","editStartEpochMs":12345,"editEndEpochMs":12346}]}';

export const serializedWorkspace001 = `
W3sia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjAsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1Nzk5MTE5OTY2NzMsImVkaXRFbmRFcG9jaE1zIjoxNTc5OTEyMDAwNTI0fX19XQ==
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjQ4YTMyMTk3OGYyOTRmMjc5NTk4N2U4NjYyMDMxNzc3Il0sInJocyI6eyJzdGFydE9mZnNldCI6MCwiYmVhdHMiOlt7ImR1cmF0aW9uTWluIjoxLCJvbmVMaW5lciI6IkFjdCAxIn0seyJkdXJhdGlvbk1pbiI6MSwib25lTGluZXIiOiJBY3QgMmEifSx7ImR1cmF0aW9uTWluIjoxLCJvbmVMaW5lciI6IkFjdCAyYiJ9LHsiZHVyYXRpb25NaW4iOjEsIm9uZUxpbmVyIjoiQWN0IDMifV0sImlkIjoiNDhhMzIxOTc4ZjI5NGYyNzk1OTg3ZTg2NjIwMzE3NzciLCJvbmVMaW5lciI6IlRocmVlIEFjdCBTdHJ1Y3R1cmUgKENsYXNzaWMpIn19LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjg4ZjkxZjRkOGU0YjRkMTNhZTA3MGI4Y2E3ODczOTk2Il0sInJocyI6eyJzdGFydE9mZnNldCI6MCwiYmVhdHMiOlt7ImR1cmF0aW9uTWluIjoxLCJvbmVMaW5lciI6IkJlYXQgMSJ9LHsiZHVyYXRpb25NaW4iOjEsIm9uZUxpbmVyIjoiQmVhdCAyIn0seyJkdXJhdGlvbk1pbiI6MSwib25lTGluZXIiOiJCZWF0IDMifSx7ImR1cmF0aW9uTWluIjoxLCJvbmVMaW5lciI6IkJlYXQgNCJ9LHsiZHVyYXRpb25NaW4iOjEsIm9uZUxpbmVyIjoiQmVhdCA1In0seyJkdXJhdGlvbk1pbiI6MSwib25lTGluZXIiOiJCZWF0IDYifSx7ImR1cmF0aW9uTWluIjoxLCJvbmVMaW5lciI6IkJlYXQgNyJ9LHsiZHVyYXRpb25NaW4iOjEsIm9uZUxpbmVyIjoiQmVhdCA4In1dLCJpZCI6Ijg4ZjkxZjRkOGU0YjRkMTNhZTA3MGI4Y2E3ODczOTk2Iiwib25lTGluZXIiOiJTdG9yeSBXaGVlbCJ9fSx7ImtpbmQiOiJOIiwicGF0aCI6WyJzdHJ1Y3R1cmVUZW1wbGF0ZXMiLCIyYzE1YTVjMjNiOWQ0YTgzYTIzYTdiMTk0ZGZkZWNiMiJdLCJyaHMiOnsic3RhcnRPZmZzZXQiOi0xLjAzMzMzMzMzMzMzMzMzMzIsImJlYXRzIjpbeyJkdXJhdGlvbk1pbiI6MC44MTY2NjY2NjY2NjY2NjY3LCJvbmVMaW5lciI6IkludHJvIn0seyJkdXJhdGlvbk1pbiI6MS44LCJvbmVMaW5lciI6IkJhbGxhZCJ9LHsiZHVyYXRpb25NaW4iOjAuNDY2NjY2NjY2NjY2NjY2OCwib25lTGluZXIiOiJHdWl0YXIgU29sbyJ9LHsiZHVyYXRpb25NaW4iOjEuMDMzMzMzMzMzMzMzMzMyOCwib25lTGluZXIiOiJPcGVyYSJ9LHsiZHVyYXRpb25NaW4iOjEuODE2NjY2NjY2NjY2NjY3Mywib25lTGluZXIiOiJIYXJkIHJvY2sifSx7ImR1cmF0aW9uTWluIjoxLjAxNjY2NjY2NjY2NjY2NjYsIm9uZUxpbmVyIjoiT3V0cm8ifV0sImlkIjoiMmMxNWE1YzIzYjlkNGE4M2EyM2E3YjE5NGRmZGVjYjIiLCJvbmVMaW5lciI6IkJvaGVtaWFuIFJoYXBzb2R5In19LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjEsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODA0NDE3NzAyMTgsImVkaXRFbmRFcG9jaE1zIjoxNTgwNDQyMDI4NTEyfX19XQ==
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjQ4YTMyMTk3OGYyOTRmMjc5NTk4N2U4NjYyMDMxNzc3IiwiYmVhdHMiLDMsImRlc2NyaXB0aW9uIl0sInJocyI6IlRyYW5zZm9ybWF0aW9uIGlzIGdvb2QhIn0seyJraW5kIjoiTiIsInBhdGgiOlsic3RydWN0dXJlVGVtcGxhdGVzIiwiNDhhMzIxOTc4ZjI5NGYyNzk1OTg3ZTg2NjIwMzE3NzciLCJiZWF0cyIsMiwiZGVzY3JpcHRpb24iXSwicmhzIjoiUnVoIHJvaCwgY2hhbmdlIGlzIGJhZCJ9LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjQ4YTMyMTk3OGYyOTRmMjc5NTk4N2U4NjYyMDMxNzc3IiwiYmVhdHMiLDEsImRlc2NyaXB0aW9uIl0sInJocyI6IlN0YXJ0IHRvIGNoYW5nZSEifSx7ImtpbmQiOiJOIiwicGF0aCI6WyJzdHJ1Y3R1cmVUZW1wbGF0ZXMiLCI0OGEzMjE5NzhmMjk0ZjI3OTU5ODdlODY2MjAzMTc3NyIsImJlYXRzIiwwLCJkZXNjcmlwdGlvbiJdLCJyaHMiOiJMYXkgb3V0IHRoZSB3b3JsZCBhcyBpdCB3YXMgYXQgdGhlIGJlZ2lubmluZyJ9LHsia2luZCI6IkUiLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjJjMTVhNWMyM2I5ZDRhODNhMjNhN2IxOTRkZmRlY2IyIiwic3RhcnRPZmZzZXQiXSwibGhzIjotMS4wMzMzMzMzMzMzMzMzMzMyLCJyaHMiOjB9LHsia2luZCI6IkUiLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjJjMTVhNWMyM2I5ZDRhODNhMjNhN2IxOTRkZmRlY2IyIiwiYmVhdHMiLDUsImR1cmF0aW9uTWluIl0sImxocyI6MS4wMTY2NjY2NjY2NjY2NjY2LCJyaHMiOjEuMDF9LHsia2luZCI6IkUiLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjJjMTVhNWMyM2I5ZDRhODNhMjNhN2IxOTRkZmRlY2IyIiwiYmVhdHMiLDQsImR1cmF0aW9uTWluIl0sImxocyI6MS44MTY2NjY2NjY2NjY2NjczLCJyaHMiOjAuODF9LHsia2luZCI6IkUiLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjJjMTVhNWMyM2I5ZDRhODNhMjNhN2IxOTRkZmRlY2IyIiwiYmVhdHMiLDMsImR1cmF0aW9uTWluIl0sImxocyI6MS4wMzMzMzMzMzMzMzMzMzI4LCJyaHMiOjEuMDN9LHsia2luZCI6IkUiLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjJjMTVhNWMyM2I5ZDRhODNhMjNhN2IxOTRkZmRlY2IyIiwiYmVhdHMiLDIsImR1cmF0aW9uTWluIl0sImxocyI6MC40NjY2NjY2NjY2NjY2NjY4LCJyaHMiOjAuNDZ9LHsia2luZCI6IkUiLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjJjMTVhNWMyM2I5ZDRhODNhMjNhN2IxOTRkZmRlY2IyIiwiYmVhdHMiLDAsImR1cmF0aW9uTWluIl0sImxocyI6MC44MTY2NjY2NjY2NjY2NjY3LCJyaHMiOjAuODF9LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjIsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODA0NDI3NzY3NTcsImVkaXRFbmRFcG9jaE1zIjoxNTgwNDQyOTE3NDAyfX19XQ==
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCJiYTllOTdiNzMzN2U0Zjc0ODA3NDI4MzdlYmE4YTIwZSJdLCJyaHMiOnsic2ltaWxhck1vdmllSWRzIjpbXSwic3RydWN0dXJlRWxlbWVudHMiOnt9fX0seyJraW5kIjoiQSIsInBhdGgiOlsiaGlzdG9yeSJdLCJpbmRleCI6MywiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6eyJ1c2VyRW1haWwiOiJqb24uc2ltcGtpbnNAZ21haWwuY29tIiwiZWRpdFN0YXJ0RXBvY2hNcyI6MTU4MDczNDI2MjkxNCwiZWRpdEVuZEVwb2NoTXMiOjE1ODA3MzQyNjc3MzJ9fX1d
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCJiYTllOTdiNzMzN2U0Zjc0ODA3NDI4MzdlYmE4YTIwZSIsInN0cnVjdHVyZUVsZW1lbnRzIiwiMmY4ZDczOGFkN2MyNDcxYWEyOTdkNzNhODkzMDQ1MzYiXSwicmhzIjp7InN1YlN0cnVjdHVyZUVsZW1lbnRzIjpbXSwiaWQiOiIyZjhkNzM4YWQ3YzI0NzFhYTI5N2Q3M2E4OTMwNDUzNiJ9fSx7ImtpbmQiOiJOIiwicGF0aCI6WyJzdG9yaWVzIiwiYmE5ZTk3YjczMzdlNGY3NDgwNzQyODM3ZWJhOGEyMGUiLCJwbG90RWxlbWVudElkIl0sInJocyI6IjJmOGQ3MzhhZDdjMjQ3MWFhMjk3ZDczYTg5MzA0NTM2In0seyJraW5kIjoiQSIsInBhdGgiOlsiaGlzdG9yeSJdLCJpbmRleCI6NCwiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6eyJ1c2VyRW1haWwiOiJqb24uc2ltcGtpbnNAZ21haWwuY29tIiwiZWRpdFN0YXJ0RXBvY2hNcyI6MTU4MDczNDI3OTY0NSwiZWRpdEVuZEVwb2NoTXMiOjE1ODA3MzQyODc5MzJ9fX1d
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCJiYTllOTdiNzMzN2U0Zjc0ODA3NDI4MzdlYmE4YTIwZSIsInN0cnVjdHVyZUVsZW1lbnRzIiwiMmY4ZDczOGFkN2MyNDcxYWEyOTdkNzNhODkzMDQ1MzYiLCJzdW1tYXJ5UmF3VGV4dCJdLCJyaHMiOiJ0aGlzIGlzIG15IHN1bW1hcnlcbiJ9LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjUsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODA3MzQ0MDI5MTIsImVkaXRFbmRFcG9jaE1zIjoxNTgwNzM0NDEzNTY3fX19XQ==
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCJiYTllOTdiNzMzN2U0Zjc0ODA3NDI4MzdlYmE4YTIwZSIsInN0cnVjdHVyZUVsZW1lbnRzIiwiMmY4ZDczOGFkN2MyNDcxYWEyOTdkNzNhODkzMDQ1MzYiLCJkdXJhdGlvbk1pbiJdLCJyaHMiOjEwMH0seyJraW5kIjoiTiIsInBhdGgiOlsic3RvcmllcyIsImJhOWU5N2I3MzM3ZTRmNzQ4MDc0MjgzN2ViYThhMjBlIiwicnVudGltZU1pbiJdLCJyaHMiOjEwMH0seyJraW5kIjoiQSIsInBhdGgiOlsiaGlzdG9yeSJdLCJpbmRleCI6NiwiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6eyJ1c2VyRW1haWwiOiJqb24uc2ltcGtpbnNAZ21haWwuY29tIiwiZWRpdFN0YXJ0RXBvY2hNcyI6MTU4MDg3MTU3NTIxNiwiZWRpdEVuZEVwb2NoTXMiOjE1ODA4NzE1Nzk5ODZ9fX1d
`;

export const serializedWorkspace002 = `
W3sia2luZCI6Ik4iLCJwYXRoIjpbInNpbWlsYXJNb3ZpZXMiLCI1NjBkYWQyNjljMzQ0NjQ0ODY5NjJmNzRlMzU0ZjM5NiJdLCJyaHMiOnsiaWQiOiI1NjBkYWQyNjljMzQ0NjQ0ODY5NjJmNzRlMzU0ZjM5NiIsInRpdGxlIjoiTWFkIE1heDogRnVyeSBSb2FkIn19LHsia2luZCI6Ik4iLCJwYXRoIjpbInNpbWlsYXJNb3ZpZXMiLCIxODQ2MjFjOTUwOGE0NDc5ODc2YmRkZDE1MGU3NDE3NSJdLCJyaHMiOnsiaWQiOiIxODQ2MjFjOTUwOGE0NDc5ODc2YmRkZDE1MGU3NDE3NSIsInRpdGxlIjoiSG93IHRvIFRyYWluIFlvdXIgRHJhZ29uIn19LHsia2luZCI6Ik4iLCJwYXRoIjpbInNpbWlsYXJNb3ZpZXMiLCI4MmY3ZDJiYWIxNzQ0MDIwYmI3NzlhNzg1MzhiMmZiMiJdLCJyaHMiOnsiaWQiOiI4MmY3ZDJiYWIxNzQ0MDIwYmI3NzlhNzg1MzhiMmZiMiIsInRpdGxlIjoiR2xvcmlhIEJlbGwifX0seyJraW5kIjoiTiIsInBhdGgiOlsic3RvcmllcyIsIjZhZjM5YzMwMzZlNDQ5MGFhYzRlM2QxNTQyYmI4YTM2Il0sInJocyI6eyJzaW1pbGFyTW92aWVJZHMiOlsiNTYwZGFkMjY5YzM0NDY0NDg2OTYyZjc0ZTM1NGYzOTYiLCIxODQ2MjFjOTUwOGE0NDc5ODc2YmRkZDE1MGU3NDE3NSIsIjgyZjdkMmJhYjE3NDQwMjBiYjc3OWE3ODUzOGIyZmIyIl0sInN0cnVjdHVyZUVsZW1lbnRzIjp7fX19LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjAsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODEzOTA5NzIwNDQsImVkaXRFbmRFcG9jaE1zIjoxNTgxMzkxMDE5Mzc4fX19XQ==
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI2YWYzOWMzMDM2ZTQ0OTBhYWM0ZTNkMTU0MmJiOGEzNiIsImxvZ0xpbmUiXSwicmhzIjoiSW4gYSBwb3N0LWFwb2NhbHlwdGljIHdhc3RlbGFuZCwgWnlyYSB3b3JrcyBvbiBhIGRyYWdvbiByYW5jaCwgaGVyIGtpZHMgYXJlIGdyb3duLCBhbmQgc2hlIGRldmVsb3BzIGEgcm9tYW50aWMgcmVsYXRpb25zaGlwIHdpdGggYSBsb25lciB3aG8gc2hvd3MgdXAgbG9va2luZyBmb3Igc2hlbHRlci5cbiJ9LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjEsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODEzOTEwMjEyNDUsImVkaXRFbmRFcG9jaE1zIjoxNTgxMzkxMTU2OTY2fX19XQ==
W3sia2luZCI6Ik4iLCJwYXRoIjpbInNpbWlsYXJNb3ZpZXMiLCI1NjBkYWQyNjljMzQ0NjQ0ODY5NjJmNzRlMzU0ZjM5NiIsInJ1bnRpbWVNaW4iXSwicmhzIjoiMTIyIn0seyJraW5kIjoiTiIsInBhdGgiOlsic2ltaWxhck1vdmllcyIsIjU2MGRhZDI2OWMzNDQ2NDQ4Njk2MmY3NGUzNTRmMzk2IiwidG1iZFVybCJdLCJyaHMiOiJodHRwczovL3d3dy50aGVtb3ZpZWRiLm9yZy9tb3ZpZS83NjM0MS1tYWQtbWF4LWZ1cnktcm9hZCJ9LHsia2luZCI6Ik4iLCJwYXRoIjpbInNpbWlsYXJNb3ZpZXMiLCIxODQ2MjFjOTUwOGE0NDc5ODc2YmRkZDE1MGU3NDE3NSIsInRtYmRVcmwiXSwicmhzIjoiaHR0cHM6Ly93d3cudGhlbW92aWVkYi5vcmcvbW92aWUvMTAxOTEtaG93LXRvLXRyYWluLXlvdXItZHJhZ29uIn0seyJraW5kIjoiTiIsInBhdGgiOlsic2ltaWxhck1vdmllcyIsIjE4NDYyMWM5NTA4YTQ0Nzk4NzZiZGRkMTUwZTc0MTc1IiwicnVudGltZU1pbiJdLCJyaHMiOiIxMDAifSx7ImtpbmQiOiJOIiwicGF0aCI6WyJzaW1pbGFyTW92aWVzIiwiODJmN2QyYmFiMTc0NDAyMGJiNzc5YTc4NTM4YjJmYjIiLCJydW50aW1lTWluIl0sInJocyI6IjEwMiJ9LHsia2luZCI6Ik4iLCJwYXRoIjpbInNpbWlsYXJNb3ZpZXMiLCI4MmY3ZDJiYWIxNzQ0MDIwYmI3NzlhNzg1MzhiMmZiMiIsInRtYmRVcmwiXSwicmhzIjoiaHR0cHM6Ly93d3cudGhlbW92aWVkYi5vcmcvbW92aWUvNDkxNDczLWdsb3JpYSJ9LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjIsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODEzOTExNjM2MzksImVkaXRFbmRFcG9jaE1zIjoxNTgxMzkxMjMwMTUzfX19XQ==
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI2YWYzOWMzMDM2ZTQ0OTBhYWM0ZTNkMTU0MmJiOGEzNiIsInJ1bnRpbWVNaW4iXSwicmhzIjoxMTB9LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjMsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODEzOTEyMzQxOTcsImVkaXRFbmRFcG9jaE1zIjoxNTgxMzkxMjUxOTA2fX19XQ==
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI2YWYzOWMzMDM2ZTQ0OTBhYWM0ZTNkMTU0MmJiOGEzNiIsInN0cnVjdHVyZUVsZW1lbnRzIiwiODY5OWNlNGE5NjhiNGE1ZmJiMjhjMDgxNDM0MzY3NjEiXSwicmhzIjp7InN1YlN0cnVjdHVyZUVsZW1lbnRzIjpbXSwiaWQiOiI4Njk5Y2U0YTk2OGI0YTVmYmIyOGMwODE0MzQzNjc2MSIsImR1cmF0aW9uTWluIjoxMTAsInN1bW1hcnlSYXdUZXh0IjoiRXN0YWJsaXNoIHNpdHVhdGlvbiwgd2FzdGVsYW5kLCByYW5jaCBkZXRhaWxzLCBtZWV0IFp5cmFcblxuTG9uZXIgYXJyaXZlc1xuXG5Sb21hbmNlIGVuc3Vlc1xuXG5Mb25lciBkZXBhcnRzXG4ifX0seyJraW5kIjoiTiIsInBhdGgiOlsic3RvcmllcyIsIjZhZjM5YzMwMzZlNDQ5MGFhYzRlM2QxNTQyYmI4YTM2IiwicGxvdEVsZW1lbnRJZCJdLCJyaHMiOiI4Njk5Y2U0YTk2OGI0YTVmYmIyOGMwODE0MzQzNjc2MSJ9LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjQsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODEzOTEyNTU2NTQsImVkaXRFbmRFcG9jaE1zIjoxNTgxMzkxMzE4MzY1fX19XQ==
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjJjMTVhNWMyM2I5ZDRhODNhMjNhN2IxOTRkZmRlY2IyIl0sInJocyI6eyJzdGFydE9mZnNldCI6MCwiYmVhdHMiOlt7ImR1cmF0aW9uTWluIjowLjgxLCJvbmVMaW5lciI6IkludHJvIiwiZGVzY3JpcHRpb24iOiJJbnRyb2R1Y2UganVzdCBhIGZldyBlbGVtZW50cyJ9LHsiZHVyYXRpb25NaW4iOjEuOCwib25lTGluZXIiOiJCYWxsYWQiLCJkZXNjcmlwdGlvbiI6Ik5ldyBlbGVtZW50cywgc3dlbGwgYW5kIGJ1aWxkIHdpdGggd2hhdCB3YXMgdGhlcmUifSx7ImR1cmF0aW9uTWluIjowLjQ2LCJvbmVMaW5lciI6Ikd1aXRhciBTb2xvIiwiZGVzY3JpcHRpb24iOiJCdWlsZCBpbiBpbnRlbnNpdHksIG9yaWdpbmFsIGVsZW1lbnRzIG5vdyBnb25lIn0seyJkdXJhdGlvbk1pbiI6MS4wMywib25lTGluZXIiOiJPcGVyYSIsImRlc2NyaXB0aW9uIjoiT3JpZ2luYWwgZWxlbWVudHMgbm93IHRyYW5zZm9ybWVkLCBidWlsZCB0byBicmVha2luZyBwb2ludCJ9LHsiZHVyYXRpb25NaW4iOjAuODEsIm9uZUxpbmVyIjoiSGFyZCByb2NrIiwiZGVzY3JpcHRpb24iOiJIYXZlIGZ1biwgdGVhciBsb29zZSJ9LHsiZHVyYXRpb25NaW4iOjEuMDEsIm9uZUxpbmVyIjoiT3V0cm8iLCJkZXNjcmlwdGlvbiI6IkNvbWUgYmFjayBkb3duIHdpdGggb25seSBvcmlnaW5hbCBlbGVtZW50cyByZW1haW5pbmcifV0sImlkIjoiMmMxNWE1YzIzYjlkNGE4M2EyM2E3YjE5NGRmZGVjYjIiLCJvbmVMaW5lciI6IkJvaGVtaWFuIFJoYXBzb2R5In19LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjQ4YTMyMTk3OGYyOTRmMjc5NTk4N2U4NjYyMDMxNzc3Il0sInJocyI6eyJzdGFydE9mZnNldCI6MCwiYmVhdHMiOlt7ImR1cmF0aW9uTWluIjozMCwib25lTGluZXIiOiJBY3QgMSIsImRlc2NyaXB0aW9uIjoiTGF5IG91dCB0aGUgd29ybGQgYXMgaXQgd2FzIGF0IHRoZSBiZWdpbm5pbmcifSx7ImR1cmF0aW9uTWluIjozMCwib25lTGluZXIiOiJBY3QgMmEiLCJkZXNjcmlwdGlvbiI6IlN0YXJ0IHRvIGNoYW5nZSEifSx7ImR1cmF0aW9uTWluIjozMCwib25lTGluZXIiOiJBY3QgMmIiLCJkZXNjcmlwdGlvbiI6IlJ1aCByb2gsIGNoYW5nZSBpcyBiYWQifSx7ImR1cmF0aW9uTWluIjozMCwib25lTGluZXIiOiJBY3QgMyIsImRlc2NyaXB0aW9uIjoiVHJhbnNmb3JtYXRpb24gaXMgZ29vZCEifV0sImlkIjoiNDhhMzIxOTc4ZjI5NGYyNzk1OTg3ZTg2NjIwMzE3NzciLCJvbmVMaW5lciI6IlRocmVlIEFjdCBTdHJ1Y3R1cmUgKENsYXNzaWMpIn19LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjg4ZjkxZjRkOGU0YjRkMTNhZTA3MGI4Y2E3ODczOTk2Il0sInJocyI6eyJzdGFydE9mZnNldCI6MCwiYmVhdHMiOlt7ImR1cmF0aW9uTWluIjoxNSwib25lTGluZXIiOiJCZWF0IDEiLCJkZXNjcmlwdGlvbiI6Ikhlcm8gaXMgaW4gYSB6b25lIG9mIGNvbWZvcnQifSx7ImR1cmF0aW9uTWluIjoxNSwib25lTGluZXIiOiJCZWF0IDIiLCJkZXNjcmlwdGlvbiI6IkJ1dCB0aGV5IHdhbnQgc29tZXRoaW5nIn0seyJkdXJhdGlvbk1pbiI6MTUsIm9uZUxpbmVyIjoiQmVhdCAzIiwiZGVzY3JpcHRpb24iOiJUaGV5IGVudGVyIGFuIHVuZmFtaWxpYXIgc2l0dWF0aW9uIn0seyJkdXJhdGlvbk1pbiI6MTUsIm9uZUxpbmVyIjoiQmVhdCA0IiwiZGVzY3JpcHRpb24iOiJBZGFwdCB0byBpdCJ9LHsiZHVyYXRpb25NaW4iOjE1LCJvbmVMaW5lciI6IkJlYXQgNSIsImRlc2NyaXB0aW9uIjoiR2V0IHdoYXQgdGhleSB3YW50ZWQifSx7ImR1cmF0aW9uTWluIjoxNSwib25lTGluZXIiOiJCZWF0IDYiLCJkZXNjcmlwdGlvbiI6IlBheSBhIGhlYXZ5IHByaWNlIGZvciBpdCJ9LHsiZHVyYXRpb25NaW4iOjE1LCJvbmVMaW5lciI6IkJlYXQgNyIsImRlc2NyaXB0aW9uIjoiVGhlbiByZXR1cm4gdG8gdGhlaXIgZmFtaWxpYXIgc2l0dWF0aW9uIn0seyJkdXJhdGlvbk1pbiI6MTUsIm9uZUxpbmVyIjoiQmVhdCA4IiwiZGVzY3JpcHRpb24iOiJIYXZpbmcgY2hhbmdlZCJ9XSwiaWQiOiI4OGY5MWY0ZDhlNGI0ZDEzYWUwNzBiOGNhNzg3Mzk5NiIsIm9uZUxpbmVyIjoiRGFuIEhhcm1vbiBTdG9yeSBXaGVlbCJ9fSx7ImtpbmQiOiJBIiwicGF0aCI6WyJzdG9yaWVzIiwiNmFmMzljMzAzNmU0NDkwYWFjNGUzZDE1NDJiYjhhMzYiLCJzdHJ1Y3R1cmVFbGVtZW50cyIsIjg2OTljZTRhOTY4YjRhNWZiYjI4YzA4MTQzNDM2NzYxIiwic3ViU3RydWN0dXJlRWxlbWVudHMiXSwiaW5kZXgiOjUsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOm51bGx9fSx7ImtpbmQiOiJBIiwicGF0aCI6WyJzdG9yaWVzIiwiNmFmMzljMzAzNmU0NDkwYWFjNGUzZDE1NDJiYjhhMzYiLCJzdHJ1Y3R1cmVFbGVtZW50cyIsIjg2OTljZTRhOTY4YjRhNWZiYjI4YzA4MTQzNDM2NzYxIiwic3ViU3RydWN0dXJlRWxlbWVudHMiXSwiaW5kZXgiOjQsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOm51bGx9fSx7ImtpbmQiOiJBIiwicGF0aCI6WyJzdG9yaWVzIiwiNmFmMzljMzAzNmU0NDkwYWFjNGUzZDE1NDJiYjhhMzYiLCJzdHJ1Y3R1cmVFbGVtZW50cyIsIjg2OTljZTRhOTY4YjRhNWZiYjI4YzA4MTQzNDM2NzYxIiwic3ViU3RydWN0dXJlRWxlbWVudHMiXSwiaW5kZXgiOjMsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOiJjMWQ0MTgzMjQ2NzY0ZTRjYjE2YTQ4M2UwODI4ZGRjZSJ9fSx7ImtpbmQiOiJBIiwicGF0aCI6WyJzdG9yaWVzIiwiNmFmMzljMzAzNmU0NDkwYWFjNGUzZDE1NDJiYjhhMzYiLCJzdHJ1Y3R1cmVFbGVtZW50cyIsIjg2OTljZTRhOTY4YjRhNWZiYjI4YzA4MTQzNDM2NzYxIiwic3ViU3RydWN0dXJlRWxlbWVudHMiXSwiaW5kZXgiOjIsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOiJjNDExNjk0ODA0NmU0NGNiYmQwZWRlYmE0NmM2ZjNlNiJ9fSx7ImtpbmQiOiJBIiwicGF0aCI6WyJzdG9yaWVzIiwiNmFmMzljMzAzNmU0NDkwYWFjNGUzZDE1NDJiYjhhMzYiLCJzdHJ1Y3R1cmVFbGVtZW50cyIsIjg2OTljZTRhOTY4YjRhNWZiYjI4YzA4MTQzNDM2NzYxIiwic3ViU3RydWN0dXJlRWxlbWVudHMiXSwiaW5kZXgiOjEsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOiIzYjk3YTU0MmVkZjM0ZjM1OTIxYTFiYzg1YjE2NGFmMiJ9fSx7ImtpbmQiOiJBIiwicGF0aCI6WyJzdG9yaWVzIiwiNmFmMzljMzAzNmU0NDkwYWFjNGUzZDE1NDJiYjhhMzYiLCJzdHJ1Y3R1cmVFbGVtZW50cyIsIjg2OTljZTRhOTY4YjRhNWZiYjI4YzA4MTQzNDM2NzYxIiwic3ViU3RydWN0dXJlRWxlbWVudHMiXSwiaW5kZXgiOjAsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOm51bGx9fSx7ImtpbmQiOiJOIiwicGF0aCI6WyJzdG9yaWVzIiwiNmFmMzljMzAzNmU0NDkwYWFjNGUzZDE1NDJiYjhhMzYiLCJzdHJ1Y3R1cmVFbGVtZW50cyIsIjg2OTljZTRhOTY4YjRhNWZiYjI4YzA4MTQzNDM2NzYxIiwidGVtcGxhdGVJZCJdLCJyaHMiOiIyYzE1YTVjMjNiOWQ0YTgzYTIzYTdiMTk0ZGZkZWNiMiJ9LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI2YWYzOWMzMDM2ZTQ0OTBhYWM0ZTNkMTU0MmJiOGEzNiIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYzFkNDE4MzI0Njc2NGU0Y2IxNmE0ODNlMDgyOGRkY2UiXSwicmhzIjp7InN1YlN0cnVjdHVyZUVsZW1lbnRzIjpbbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsXSwiaWQiOiJjMWQ0MTgzMjQ2NzY0ZTRjYjE2YTQ4M2UwODI4ZGRjZSIsInBhcmVudElkIjoiODY5OWNlNGE5NjhiNGE1ZmJiMjhjMDgxNDM0MzY3NjEiLCJkdXJhdGlvbk1pbiI6MTkuMTM4NTEzNTEzNTEzNTEyLCJvbmVMaW5lciI6Ik9yaWdpbmFsIGZhbWlseSBlbGVtZW50cyBhbGwgY29tZSBiYWNrIHRvIHJvb3N0IiwidGVtcGxhdGVJZCI6Ijg4ZjkxZjRkOGU0YjRkMTNhZTA3MGI4Y2E3ODczOTk2In19LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI2YWYzOWMzMDM2ZTQ0OTBhYWM0ZTNkMTU0MmJiOGEzNiIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYzQxMTY5NDgwNDZlNDRjYmJkMGVkZWJhNDZjNmYzZTYiXSwicmhzIjp7InN1YlN0cnVjdHVyZUVsZW1lbnRzIjpbXSwiaWQiOiJjNDExNjk0ODA0NmU0NGNiYmQwZWRlYmE0NmM2ZjNlNiIsInBhcmVudElkIjoiODY5OWNlNGE5NjhiNGE1ZmJiMjhjMDgxNDM0MzY3NjEiLCJkdXJhdGlvbk1pbiI6OC41NDcyOTcyOTcyOTcyOTgsIm9uZUxpbmVyIjoiU29tZXRoaW5nIHdpdGgganVzdCB0aGUgbG9uZXIifX0seyJraW5kIjoiTiIsInBhdGgiOlsic3RvcmllcyIsIjZhZjM5YzMwMzZlNDQ5MGFhYzRlM2QxNTQyYmI4YTM2Iiwic3RydWN0dXJlRWxlbWVudHMiLCIzYjk3YTU0MmVkZjM0ZjM1OTIxYTFiYzg1YjE2NGFmMiJdLCJyaHMiOnsic3ViU3RydWN0dXJlRWxlbWVudHMiOltdLCJpZCI6IjNiOTdhNTQyZWRmMzRmMzU5MjFhMWJjODViMTY0YWYyIiwicGFyZW50SWQiOiI4Njk5Y2U0YTk2OGI0YTVmYmIyOGMwODE0MzQzNjc2MSIsImR1cmF0aW9uTWluIjozMy40NDU5NDU5NDU5NDU5NDQsIm9uZUxpbmVyIjoiTG9uZXIgaW50cm9kdWNlZCJ9fSx7ImtpbmQiOiJBIiwicGF0aCI6WyJoaXN0b3J5Il0sImluZGV4Ijo1LCJpdGVtIjp7ImtpbmQiOiJOIiwicmhzIjp7InVzZXJFbWFpbCI6Impvbi5zaW1wa2luc0BnbWFpbC5jb20iLCJlZGl0U3RhcnRFcG9jaE1zIjoxNTgxNTExMDU2MzE3LCJlZGl0RW5kRXBvY2hNcyI6MTU4MTUxMTE4ODgzNn19fV0=
`

export const serializedWorkspace003 = `
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjJjMTVhNWMyM2I5ZDRhODNhMjNhN2IxOTRkZmRlY2IyIl0sInJocyI6eyJzdGFydE9mZnNldCI6MCwiYmVhdHMiOlt7ImR1cmF0aW9uTWluIjowLjgxLCJvbmVMaW5lciI6IkludHJvIiwiZGVzY3JpcHRpb24iOiJJbnRyb2R1Y2UganVzdCBhIGZldyBlbGVtZW50cyJ9LHsiZHVyYXRpb25NaW4iOjEuOCwib25lTGluZXIiOiJCYWxsYWQiLCJkZXNjcmlwdGlvbiI6Ik5ldyBlbGVtZW50cywgc3dlbGwgYW5kIGJ1aWxkIHdpdGggd2hhdCB3YXMgdGhlcmUifSx7ImR1cmF0aW9uTWluIjowLjQ2LCJvbmVMaW5lciI6Ikd1aXRhciBTb2xvIiwiZGVzY3JpcHRpb24iOiJCdWlsZCBpbiBpbnRlbnNpdHksIG9yaWdpbmFsIGVsZW1lbnRzIG5vdyBnb25lIn0seyJkdXJhdGlvbk1pbiI6MS4wMywib25lTGluZXIiOiJPcGVyYSIsImRlc2NyaXB0aW9uIjoiT3JpZ2luYWwgZWxlbWVudHMgbm93IHRyYW5zZm9ybWVkLCBidWlsZCB0byBicmVha2luZyBwb2ludCJ9LHsiZHVyYXRpb25NaW4iOjAuODEsIm9uZUxpbmVyIjoiSGFyZCByb2NrIiwiZGVzY3JpcHRpb24iOiJIYXZlIGZ1biwgdGVhciBsb29zZSJ9LHsiZHVyYXRpb25NaW4iOjEuMDEsIm9uZUxpbmVyIjoiT3V0cm8iLCJkZXNjcmlwdGlvbiI6IkNvbWUgYmFjayBkb3duIHdpdGggb25seSBvcmlnaW5hbCBlbGVtZW50cyByZW1haW5pbmcifV0sImlkIjoiMmMxNWE1YzIzYjlkNGE4M2EyM2E3YjE5NGRmZGVjYjIiLCJvbmVMaW5lciI6IkJvaGVtaWFuIFJoYXBzb2R5In19LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjQ4YTMyMTk3OGYyOTRmMjc5NTk4N2U4NjYyMDMxNzc3Il0sInJocyI6eyJzdGFydE9mZnNldCI6MCwiYmVhdHMiOlt7ImR1cmF0aW9uTWluIjozMCwib25lTGluZXIiOiJBY3QgMSIsImRlc2NyaXB0aW9uIjoiTGF5IG91dCB0aGUgd29ybGQgYXMgaXQgd2FzIGF0IHRoZSBiZWdpbm5pbmcifSx7ImR1cmF0aW9uTWluIjozMCwib25lTGluZXIiOiJBY3QgMmEiLCJkZXNjcmlwdGlvbiI6IlN0YXJ0IHRvIGNoYW5nZSEifSx7ImR1cmF0aW9uTWluIjozMCwib25lTGluZXIiOiJBY3QgMmIiLCJkZXNjcmlwdGlvbiI6IlJ1aCByb2gsIGNoYW5nZSBpcyBiYWQifSx7ImR1cmF0aW9uTWluIjozMCwib25lTGluZXIiOiJBY3QgMyIsImRlc2NyaXB0aW9uIjoiVHJhbnNmb3JtYXRpb24gaXMgZ29vZCEifV0sImlkIjoiNDhhMzIxOTc4ZjI5NGYyNzk1OTg3ZTg2NjIwMzE3NzciLCJvbmVMaW5lciI6IlRocmVlIEFjdCBTdHJ1Y3R1cmUgKENsYXNzaWMpIn19LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0cnVjdHVyZVRlbXBsYXRlcyIsIjg4ZjkxZjRkOGU0YjRkMTNhZTA3MGI4Y2E3ODczOTk2Il0sInJocyI6eyJzdGFydE9mZnNldCI6MCwiYmVhdHMiOlt7ImR1cmF0aW9uTWluIjoxNSwib25lTGluZXIiOiJCZWF0IDEiLCJkZXNjcmlwdGlvbiI6Ikhlcm8gaXMgaW4gYSB6b25lIG9mIGNvbWZvcnQifSx7ImR1cmF0aW9uTWluIjoxNSwib25lTGluZXIiOiJCZWF0IDIiLCJkZXNjcmlwdGlvbiI6IkJ1dCB0aGV5IHdhbnQgc29tZXRoaW5nIn0seyJkdXJhdGlvbk1pbiI6MTUsIm9uZUxpbmVyIjoiQmVhdCAzIiwiZGVzY3JpcHRpb24iOiJUaGV5IGVudGVyIGFuIHVuZmFtaWxpYXIgc2l0dWF0aW9uIn0seyJkdXJhdGlvbk1pbiI6MTUsIm9uZUxpbmVyIjoiQmVhdCA0IiwiZGVzY3JpcHRpb24iOiJBZGFwdCB0byBpdCJ9LHsiZHVyYXRpb25NaW4iOjE1LCJvbmVMaW5lciI6IkJlYXQgNSIsImRlc2NyaXB0aW9uIjoiR2V0IHdoYXQgdGhleSB3YW50ZWQifSx7ImR1cmF0aW9uTWluIjoxNSwib25lTGluZXIiOiJCZWF0IDYiLCJkZXNjcmlwdGlvbiI6IlBheSBhIGhlYXZ5IHByaWNlIGZvciBpdCJ9LHsiZHVyYXRpb25NaW4iOjE1LCJvbmVMaW5lciI6IkJlYXQgNyIsImRlc2NyaXB0aW9uIjoiVGhlbiByZXR1cm4gdG8gdGhlaXIgZmFtaWxpYXIgc2l0dWF0aW9uIn0seyJkdXJhdGlvbk1pbiI6MTUsIm9uZUxpbmVyIjoiQmVhdCA4IiwiZGVzY3JpcHRpb24iOiJIYXZpbmcgY2hhbmdlZCJ9XSwiaWQiOiI4OGY5MWY0ZDhlNGI0ZDEzYWUwNzBiOGNhNzg3Mzk5NiIsIm9uZUxpbmVyIjoiRGFuIEhhcm1vbiBTdG9yeSBXaGVlbCJ9fSx7ImtpbmQiOiJBIiwicGF0aCI6WyJoaXN0b3J5Il0sImluZGV4IjowLCJpdGVtIjp7ImtpbmQiOiJOIiwicmhzIjp7InVzZXJFbWFpbCI6Impvbi5zaW1wa2luc0BnbWFpbC5jb20iLCJlZGl0U3RhcnRFcG9jaE1zIjoxNTgyODg2OTM1OTExLCJlZGl0RW5kRXBvY2hNcyI6MTU4Mjg4Njk0NDA0OX19fV0=
W3sia2luZCI6Ik4iLCJwYXRoIjpbInNpbWlsYXJNb3ZpZXMiLCIzMTRkYTE3YjJmZWI0NDc3YTBmNjdjZDA5NDRhYzZmNSJdLCJyaHMiOnsiaWQiOiIzMTRkYTE3YjJmZWI0NDc3YTBmNjdjZDA5NDRhYzZmNSIsInRpdGxlIjoiS25pdmVzIE91dCJ9fSx7ImtpbmQiOiJOIiwicGF0aCI6WyJzaW1pbGFyTW92aWVzIiwiNWMyN2QwZDE1ZTMyNDZhMWJlYzI2ZGE0MzNhZTg2MWYiXSwicmhzIjp7ImlkIjoiNWMyN2QwZDE1ZTMyNDZhMWJlYzI2ZGE0MzNhZTg2MWYiLCJ0aXRsZSI6Ik15IE5laWdoYm9yIFRvdG9ybyJ9fSx7ImtpbmQiOiJOIiwicGF0aCI6WyJzdG9yaWVzIiwiNWJhYjAyNTViODliNDYwMDk0NTM1NzhhZWFhMjlkNGQiXSwicmhzIjp7InNpbWlsYXJNb3ZpZUlkcyI6WyIzMTRkYTE3YjJmZWI0NDc3YTBmNjdjZDA5NDRhYzZmNSIsIjVjMjdkMGQxNWUzMjQ2YTFiZWMyNmRhNDMzYWU4NjFmIl0sInN0cnVjdHVyZUVsZW1lbnRzIjp7fSwiY2hhcmFjdGVycyI6e319fSx7ImtpbmQiOiJBIiwicGF0aCI6WyJoaXN0b3J5Il0sImluZGV4IjoxLCJpdGVtIjp7ImtpbmQiOiJOIiwicmhzIjp7InVzZXJFbWFpbCI6Impvbi5zaW1wa2luc0BnbWFpbC5jb20iLCJlZGl0U3RhcnRFcG9jaE1zIjoxNTgyODg2OTUwMDAxLCJlZGl0RW5kRXBvY2hNcyI6MTU4Mjg4Njk3NTI2MX19fV0=
W3sia2luZCI6Ik4iLCJwYXRoIjpbInNpbWlsYXJNb3ZpZXMiLCIzMTRkYTE3YjJmZWI0NDc3YTBmNjdjZDA5NDRhYzZmNSIsInRtYmRVcmwiXSwicmhzIjoiaHR0cHM6Ly93d3cudGhlbW92aWVkYi5vcmcvbW92aWUvNTQ2NTU0LWtuaXZlcy1vdXQifSx7ImtpbmQiOiJOIiwicGF0aCI6WyJzaW1pbGFyTW92aWVzIiwiMzE0ZGExN2IyZmViNDQ3N2EwZjY3Y2QwOTQ0YWM2ZjUiLCJydW50aW1lTWluIl0sInJocyI6IjEzMSJ9LHsia2luZCI6Ik4iLCJwYXRoIjpbInNpbWlsYXJNb3ZpZXMiLCI1YzI3ZDBkMTVlMzI0NmExYmVjMjZkYTQzM2FlODYxZiIsInRtYmRVcmwiXSwicmhzIjoiaHR0cHM6Ly93d3cudGhlbW92aWVkYi5vcmcvbW92aWUvODM5Mi10b25hcmktbm8tdG90b3JvIn0seyJraW5kIjoiTiIsInBhdGgiOlsic2ltaWxhck1vdmllcyIsIjVjMjdkMGQxNWUzMjQ2YTFiZWMyNmRhNDMzYWU4NjFmIiwicnVudGltZU1pbiJdLCJyaHMiOiI4NCJ9LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInJ1bnRpbWVNaW4iXSwicmhzIjoxMDB9LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjIsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODI4ODcxMTQ1MzksImVkaXRFbmRFcG9jaE1zIjoxNTgyODg3NjM0OTExfX19XQ==
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsImxvZ0xpbmUiXSwicmhzIjoiTXkgZmFrZSBsb2dsaW5lXG5cbmhlcmVcbiJ9LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjMsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODI4ODkwMzI3NjksImVkaXRFbmRFcG9jaE1zIjoxNTgyODg5MDQ1MjY5fX19XQ==
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYWJkN2E3MWI5MDVhNDczZjkwNDIzNDM2NjQ5NTY4ZDUiXSwicmhzIjp7InN1YlN0cnVjdHVyZUVsZW1lbnRzIjpbXSwiY2hhcmFjdGVyQXBwZWFyYW5jZXMiOltdLCJpZCI6ImFiZDdhNzFiOTA1YTQ3M2Y5MDQyMzQzNjY0OTU2OGQ1IiwiZHVyYXRpb25NaW4iOjEwMCwic3VtbWFyeVJhd1RleHQiOiJ0aGUgd2hvbGUgcGxvdFxuIn19LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInBsb3RFbGVtZW50SWQiXSwicmhzIjoiYWJkN2E3MWI5MDVhNDczZjkwNDIzNDM2NjQ5NTY4ZDUifSx7ImtpbmQiOiJBIiwicGF0aCI6WyJoaXN0b3J5Il0sImluZGV4Ijo0LCJpdGVtIjp7ImtpbmQiOiJOIiwicmhzIjp7InVzZXJFbWFpbCI6Impvbi5zaW1wa2luc0BnbWFpbC5jb20iLCJlZGl0U3RhcnRFcG9jaE1zIjoxNTgyODg5MDQ3NjY5LCJlZGl0RW5kRXBvY2hNcyI6MTU4Mjg4OTA2NzgxN319fV0=
W3sia2luZCI6IkEiLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYWJkN2E3MWI5MDVhNDczZjkwNDIzNDM2NjQ5NTY4ZDUiLCJzdWJTdHJ1Y3R1cmVFbGVtZW50cyJdLCJpbmRleCI6NSwiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6bnVsbH19LHsia2luZCI6IkEiLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYWJkN2E3MWI5MDVhNDczZjkwNDIzNDM2NjQ5NTY4ZDUiLCJzdWJTdHJ1Y3R1cmVFbGVtZW50cyJdLCJpbmRleCI6NCwiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6bnVsbH19LHsia2luZCI6IkEiLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYWJkN2E3MWI5MDVhNDczZjkwNDIzNDM2NjQ5NTY4ZDUiLCJzdWJTdHJ1Y3R1cmVFbGVtZW50cyJdLCJpbmRleCI6MywiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6bnVsbH19LHsia2luZCI6IkEiLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYWJkN2E3MWI5MDVhNDczZjkwNDIzNDM2NjQ5NTY4ZDUiLCJzdWJTdHJ1Y3R1cmVFbGVtZW50cyJdLCJpbmRleCI6MiwiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6IjUzNTFlZTBiNDM0ZTRmOTI5MDZlYmFiZjlkZjBmYTBjIn19LHsia2luZCI6IkEiLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYWJkN2E3MWI5MDVhNDczZjkwNDIzNDM2NjQ5NTY4ZDUiLCJzdWJTdHJ1Y3R1cmVFbGVtZW50cyJdLCJpbmRleCI6MSwiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6bnVsbH19LHsia2luZCI6IkEiLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYWJkN2E3MWI5MDVhNDczZjkwNDIzNDM2NjQ5NTY4ZDUiLCJzdWJTdHJ1Y3R1cmVFbGVtZW50cyJdLCJpbmRleCI6MCwiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6bnVsbH19LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYWJkN2E3MWI5MDVhNDczZjkwNDIzNDM2NjQ5NTY4ZDUiLCJ0ZW1wbGF0ZUlkIl0sInJocyI6IjJjMTVhNWMyM2I5ZDRhODNhMjNhN2IxOTRkZmRlY2IyIn0seyJraW5kIjoiTiIsInBhdGgiOlsic3RvcmllcyIsIjViYWIwMjU1Yjg5YjQ2MDA5NDUzNTc4YWVhYTI5ZDRkIiwic3RydWN0dXJlRWxlbWVudHMiLCI1MzUxZWUwYjQzNGU0ZjkyOTA2ZWJhYmY5ZGYwZmEwYyJdLCJyaHMiOnsic3ViU3RydWN0dXJlRWxlbWVudHMiOltdLCJjaGFyYWN0ZXJBcHBlYXJhbmNlcyI6W10sImlkIjoiNTM1MWVlMGI0MzRlNGY5MjkwNmViYWJmOWRmMGZhMGMiLCJwYXJlbnRJZCI6ImFiZDdhNzFiOTA1YTQ3M2Y5MDQyMzQzNjY0OTU2OGQ1IiwiZHVyYXRpb25NaW4iOjcuNzcwMjcwMjcwMjcwMjcsIm9uZUxpbmVyIjoiR3VpdGFyIHNvbG8gdGltZSEhISJ9fSx7ImtpbmQiOiJBIiwicGF0aCI6WyJoaXN0b3J5Il0sImluZGV4Ijo1LCJpdGVtIjp7ImtpbmQiOiJOIiwicmhzIjp7InVzZXJFbWFpbCI6Impvbi5zaW1wa2luc0BnbWFpbC5jb20iLCJlZGl0U3RhcnRFcG9jaE1zIjoxNTgyODg5MDcyMDIyLCJlZGl0RW5kRXBvY2hNcyI6MTU4Mjg4OTExMjU2MX19fV0=
W3sia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInN0cnVjdHVyZUVsZW1lbnRzIiwiNTM1MWVlMGI0MzRlNGY5MjkwNmViYWJmOWRmMGZhMGMiLCJzdW1tYXJ5UmF3VGV4dCJdLCJyaHMiOiJndWl0YXJpbmdcbiJ9LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjYsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODI4ODkxMTU2NTcsImVkaXRFbmRFcG9jaE1zIjoxNTgyODg5MTI0MTc4fX19XQ==
W3sia2luZCI6IkEiLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYWJkN2E3MWI5MDVhNDczZjkwNDIzNDM2NjQ5NTY4ZDUiLCJjaGFyYWN0ZXJBcHBlYXJhbmNlcyJdLCJpbmRleCI6MCwiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6IjUyYWIzZjgzMGZkYjRkNzc5NmNhOTYwOWZlZDljMzAwIn19LHsia2luZCI6IkEiLCJwYXRoIjpbImhpc3RvcnkiXSwiaW5kZXgiOjcsIml0ZW0iOnsia2luZCI6Ik4iLCJyaHMiOnsidXNlckVtYWlsIjoiam9uLnNpbXBraW5zQGdtYWlsLmNvbSIsImVkaXRTdGFydEVwb2NoTXMiOjE1ODQwMTExODEzMjIsImVkaXRFbmRFcG9jaE1zIjoxNTg0MDExMjIwNzg2fX19XQ==
W3sia2luZCI6IkEiLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsInN0cnVjdHVyZUVsZW1lbnRzIiwiYWJkN2E3MWI5MDVhNDczZjkwNDIzNDM2NjQ5NTY4ZDUiLCJjaGFyYWN0ZXJBcHBlYXJhbmNlcyJdLCJpbmRleCI6MCwiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6IjgzYjdjYzA1YzNiMzRlYzM5YzI2ZTdjYTkxOTZiMGY0In19LHsia2luZCI6Ik4iLCJwYXRoIjpbInN0b3JpZXMiLCI1YmFiMDI1NWI4OWI0NjAwOTQ1MzU3OGFlYWEyOWQ0ZCIsImNoYXJhY3RlcnMiLCI4M2I3Y2MwNWMzYjM0ZWMzOWMyNmU3Y2E5MTk2YjBmNCJdLCJyaHMiOnsiaWQiOiI4M2I3Y2MwNWMzYjM0ZWMzOWMyNmU3Y2E5MTk2YjBmNCIsIm5hbWUiOiJKb24ifX0seyJraW5kIjoiQSIsInBhdGgiOlsiaGlzdG9yeSJdLCJpbmRleCI6NiwiaXRlbSI6eyJraW5kIjoiTiIsInJocyI6eyJ1c2VyRW1haWwiOiJqb24uc2ltcGtpbnNAZ21haWwuY29tIiwiZWRpdFN0YXJ0RXBvY2hNcyI6MTU4NDAxNDI4OTc5MiwiZWRpdEVuZEVwb2NoTXMiOjE1ODQwMTQyOTQ3NTd9fX1d`;