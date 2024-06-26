## Steps to update translation file.

1. Put old file in root directory. For example get ```albanian.txt``` file from server and put it there.

2. Get all translations info from [api-docs.quran/translations](https://api-docs.quran.com/docs/quran.com_versioned/translations), pick an id and put this id in step 3.

3. Get a single translation from [api-docs.quran/translation](https://api-docs.quran.com/docs/quran.com_versioned/translation), copy data which is like below, create a json file in root directory like ```albanian.json``` and paste data in it.
```
{
  "translations": [
    {
      "resource_id": 131,
      "text": "In the Name of Allah—the Most Compassionate, Most Merciful."
    }
  ],
  "meta": {
    "translation_name": "Dr. Mustafa Khattab, the Clear Quran",
    "author_name": "Dr. Mustafa Khattab"
  }
}
```

4. Put file name without .txt like ```albanian``` in **app.js line 3**, ```const language = "File_NAME_HERE";```.

5. Git staged ___.txt file to show changes after updation.

6. Run ```node app.js``` in terminal.

7. Check ```TOTAL LINES IN  ___.txt ___``` print in terminal, shold be greater than ```6236```(verses) ```+``` number of this line ```INSERT INTO 'TRANSLATION'``` ```+``` may be some empty lines in files.

8. Show ```NUMBER OF TRANSLATIONS TO UPDATE >>> 6236``` in console.

9. Check ```TOTAL LINES IN ___.txt AFTER UPDATION ___ ``` print in terminal, should be equal to point __6__.

10. Show ```FILE UPDATED SUCCESSFULLY.``` if everything works fine.
