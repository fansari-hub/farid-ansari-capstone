/*****************************
 * Component: LoadAnimation
 * Purpose: Displays a Simple Load Animation
 * Usage Notes: None
 ****************************/

import "./LoadAnimation.scss"
export default function LoadAnimation() {
  return (
    <div class="LoadAnimation__wrapper">
      <div class="LoadAnimation__ball LoadAnimation__ball--col1"></div>
      <div class="LoadAnimation__ball LoadAnimation__ball--col2"></div>
      <div class="LoadAnimation__ball LoadAnimation__ball--col3"></div>
      <div class="LoadAnimation__ball LoadAnimation__ball--col4"></div>
    </div>
  );
}
