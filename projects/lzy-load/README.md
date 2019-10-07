# LzyLoad

LzyLoad is a Angular 8+ Lib for loading content on demand

## Description

LzyLoad gives you the capability to lazy load, preload and unload content on demand. It is responsive, which means that if the screen resizes it will automatically readjust the settings to adapt to the new screen size.

## What's LzyLoad using in the background for doing its job

LzyLoad is using Intersection Observer API (<https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API>) as main tool to know when an HTML element gets into the visible area of the container and when leaves it, in addition, its been used to calculate how many items can be visible at the same time in the page(using the container's viewport available space)

## Use cases

Starting with the same context we can define the next use cases.

**Context:** We want to render 1000 elements on a page in our angular app. Each element of this list contains an image and a title.

- Only render the images that are visible on the viewport of the container while the user scrolls throughout the items on the list.
- Loading the images that turn visible while the user scrolls throughout all the elements of the list and unloading the images that turn invisible.

- Loading the images that are visible and preloading some more in advance, so the user doesn't need to wait until the image gets loaded while he scrolls through the list of elements.

>**Note:** Those were some use cases but are more. Besides, the content marked as "lazyloaded" not necessary needs to be images, could be whatever kind of content.

## Features

- Auto calculate how many elements are visible in the viewport of the element marked as a container
  
- Auto adjusts settings after a screen resize.

- Load content beyond the number of visible items in the viewport of the container which allows the user to scroll throughout the list of elements and don't see the content been loaded because it was loaded in advance.

- Unload the content if it is out of the range of loaded elements of the total list.

- Load content only when it gets into the viewport of the container and unload it when got out.

## Components and Directives

- **LzyLoadItemDirective** Directive that contains the properties that control if an element of the list is visible and if its content should be loaded or not, with the properties "isVisible" and "loadContent". Check the examples for an easier understanding
- **LzyLoadContComponent** Component who will act as a container for the elements that are marked as "lazyload" elements. It also has the responsibility for calculating how many elements are visible at the same time in its viewport, initializes the settings, readjusts the settings if the screen resizes, etc.

## Settings

### LzyLoadContComponent

The angular component that acts as a container for the lazyload elements accept some configuration params below are short descriptions of them.

- **unload:** If set to "true" the property "loadContent" in the LzyLoadItemDirective will be changed to true or false each time an element enters or leaves the range of loaded items. Setting it to "false" the element will remain loaded ones it was loaded.

- **container:** Is the property that allows the developer to use a different container for listening for intersections events(is used for the Intersection API) rather than the same component("LzyLoadContComponent").

- **factor:** Property that is used to calculate how many elements are going to load their content at the same time in the view. The formula is (amount of loaded content = amount of visible items * factor)
  
## Use examples

- In the next stackblitz <https://stackblitz.com/edit/angular-erkbc3> are some working examples that could be very useful as a first approach to the lib.

## Considerations

Are some important considerations to keep in mind in order to get the lib and components working as expected:

- The container element(could be the same "lzy-load-cont" component provided by the lib) must be overflowed by the elements we want to lazy load, which could be easily done by css(its recommendable to use flex styles) or with the right HTML structure.

- Because internally the lib is using Intersection Observer it needs a wrapper element for each content we want to lazy load to use it as a target to observe visibility changes. Check examples for a better understanding.

- If the content we marked as "lazyload" is inside another component that changes the HTML structure, is up to the developer to check if the content we marked for lazy loading is accessible for the "ContentChildren" view query in the "LzyLoadContComponent" when the "AfterviewInit" life cycle hook is triggered, because is when all the initialization has been done.

## Limitations

- Because the lib is using the Intersection Observer API shouldn't be used in Apps that are going to support browsers that don't support the aforementioned API.
- Some conditions need to be guaranteed for the lib to work as expected. Check the "Considerations" section.
- It only supports Angular 8+ because it was developed under that Angular version, though is possible that works in older versions of Angular, is something that needs to be tested.

