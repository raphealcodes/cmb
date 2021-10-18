import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  userAuthenticated = false;
  userVerify = false;
  authenticatedSub: Subscription;
  name = localStorage.getItem('userDetails');
  constructor(private authservice: AuthService,) { }

  ngOnInit(): void {
    this.userAuthenticated = this.authservice.getAuthenticated();
    this.userVerify = this.authservice.getIsVerify();
    this.authenticatedSub = this.authservice.getAuthenticatedListener()
        .subscribe((isAuthenticated: boolean) => {
          this.userAuthenticated = isAuthenticated;
        });

  }


    ngAfterViewInit(): void {
      $(function() {
        var header = $(".start-style");
        $(window).scroll(function() {    
          var scroll = $(window).scrollTop();
        
          if (scroll >= 10) {
            header.removeClass('start-style').addClass("scroll-on");
          } else {
            header.removeClass("scroll-on").addClass('start-style');
          }
        });
      });		
        
      //Animation
      
      $(document).ready(function() {
        $('body.hero-anime').removeClass('hero-anime');
      });
    
      //Menu On Hover
        
      $('body').on('mouseenter mouseleave','.nav-item',function(e){
          if ($(window).width() > 750) {
            var _d=$(e.target).closest('.nav-item');_d.addClass('show');
            setTimeout(function(){
            _d[_d.is(':hover')?'addClass':'removeClass']('show');
            },1);
          }
      });	
      
      //Switch light/dark
      
      $("#switch").on('click', function () {
        if ($("body").hasClass("dark")) {
          $("body").removeClass("dark");
          $("#switch").removeClass("switched");
        }
        else {
          $("body").addClass("dark");
          $("#switch").addClass("switched");
        }
      }); 


      
    $(document).ready(function(){
      // DropDown menu on mobile devices
      $('#mobile-menu__opener').on('click touchstart', function(e){
        e.preventDefault();
        
        if (!$('#menu').hasClass('menu_slide_up')) {
          $('#menu').addClass('menu_slide_up');
        } 
        
        $('#menu').toggleClass('menu_slide_down');
        $(this).toggleClass('mobile-menu__opener_menu_open');
      });
      
      // For resize window on desktop devices
      $(window).resize(function() {
        if ($(window).width() > 768) {
          if ($('#menu').hasClass('menu_slide_up')) {
            $('#menu').removeClass('menu_slide_up');
          } 
          
          if ($('#menu').hasClass('menu_slide_down')) {
            $('#menu').removeClass('menu_slide_down');
            $('#mobile-menu__opener').removeClass('mobile-menu__opener_menu_open');
          } 
        }
      });
    });
    
  }
}
