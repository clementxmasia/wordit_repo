import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  wordForm: FormGroup;
  Sentence: any[] = [];
  Word: any[] = [];
  Word_type: any = [];
  Word_catlog: any[] = [];

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private toaster: ToasterService
  ) {
    this.wordForm = this.fb.group({
      sentence: ['', Validators.required],
      word_type: ['', Validators.required],
      word: ['', Validators.required],
    });
  }

  clear_sentence() {
    this.wordForm.get('sentence').setValue('');
    this.wordForm.get('word_type').setValue('');
  }

  ngOnInit(): void {
    this.get_words();
    this.get_sentences();

    //listen to word type changes and filter words by type here
    let word_type = this.wordForm.get('word_type');
    word_type.valueChanges.subscribe(val => {
      let words = [];
      this.Word_catlog = [];
      for (let index = 0; index < this.Word.length; index++) {
        if (this.Word[index].type == val) {
          //add to list
          words.push(this.Word[index])
        }
      }
      this.Word_catlog = words;
    })

    //listen to word selection changes
    let word = this.wordForm.get('word');
    let sentence = this.wordForm.get('sentence');
    word.valueChanges.subscribe(val => {
      //construct sentence
      let s = sentence.value == '' ? val : sentence.value + ' ' + val;
      sentence.setValue(s);
    })

    //listen to sentence changes
    sentence.valueChanges.subscribe(val => {
      //get suggested sentences
      if (sentence.value != '') this.get_sentences();
    })
  }

  /**
   * get_words
   */
  public get_words() {
    this.api.get_words().subscribe(res => {
      this.Word = res.rows;
      this.Word_type = res.word_types;
      console.log('get_words:', res)
    })
  }

  /**
   * get_sentences
   */
  public get_sentences() {
    let sentence = this.wordForm.get('sentence');
    this.api.get_sentances(sentence.value).subscribe(res => {
      this.Sentence = res.rows;
      console.log('get_sentences:', res)
    })
  }

  /**
   * add_sentence
   */
  public add_sentence() {
    let sentence = this.wordForm.get('sentence');
    this.api.add_sentence(sentence.value).subscribe(res => {
      this.toaster.successToast(res.msg);
      sentence.setValue('');
      this.get_sentences();
    })
  }
}