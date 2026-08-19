---
layout: page
title: Physical simulations for Mobile Robots
description: Simulation made while in Team KJSCE Robocon for mobile robots and their mechanisms. Simulations include path planning and projectile motion.
img: assets/img/shagai-throwing-thumbnail.png
importance: 9
---

Simulations made at Team KJSCE Robocon for the Robocon-2019 competition. Simulations include path planning for a swerve drive system and a projectile mechanism.

### Path Planning

The idea was to be able to approximate the actual path to be traversed with our input equation. This helped us find minute violations and errors that the robot could make, such as touching the poles or running into the fence.

<div class="figs">
  {% include figure.liquid path="assets/img/SinePath_Real_World_Case.gif" alt="Swerve drive following a sine path in the real world" %}
  {% include figure.liquid path="assets/img/SinePath_Sim_All.gif" alt="Simulated sine path for the swerve drive" %}
</div>
<p class="caption">The real-world run (left) against the simulated path (right).</p>

### Projectile Mechanism

Fine tuning was done for the model to exactly replicate the robot's throw. The score obtained after each throw, mass of the Shagai and angle of projection were noted. After physically testing the collected data, the model correctly identified the outcome in at least 95% of the cases.

<div class="figs">
  {% include figure.liquid path="assets/img/Shagai_Pistons_Real_World_Case.gif" alt="Piston-driven Shagai throw in the real world" %}
  {% include figure.liquid path="assets/img/Shagai_Throwing_Sim_Iso.gif" alt="Isometric view of the simulated Shagai throw" %}
</div>
<p class="caption">The physical throwing mechanism (left) and its Simscape model (right).</p>

The purpose of the Shagai throwing model was to predict the outcome for any given variation in the conditions. The goal was to ensure that the Shagai lands with the golden side on top and thus obtain 50 pts, the maximum score.

The data was collected from a loop-based program which would change the angle of projection from 8.0 to 14.2. After every loop the mass of the Shagai is changed (the Shagai mass can vary from 600g to 800g as mentioned in the Robocon 2019 rulebook).

Data collected reflected the Shagai landing orientation for various angles, for Shagai of different masses. Analyzing it helped us find the ideal conditions to throw the Shagai which would result in 50 points.

In order to visualize this data a graph was created with the outcome of the Shagai throw (20, 40, 50 points) on the Y-axis against the angle on the X-axis. Multiple lines were drawn, each representing a Shagai of a different mass. The range of angles most suitable for the projection was then selected.

<div class="figs">
  {% include figure.liquid path="assets/img/Graph_AngleJustification.jpg" alt="Throw outcome plotted against launch angle for five Shagai masses" %}
</div>
<p class="caption">Outcome against launch angle, one line per Shagai mass.</p>

The purpose of this graph was to decide the angle at which we were to throw the Shagai from. The problem here was the variation of weights; with the help of our Simscape model of Shagai projection, we were able to determine the appropriate angle to launch at.

**What the graph means:** the x-axis denotes the angle at which we launched the Shagai, the y-axis denotes the result attained after it fell in the landing zone. The graph has 5 different lines, each being a Shagai of a different mass.

We then deduce from observation that the safe zone to launch the Shagai is the period 11.4 to 13.2 degrees, since it is the point wherein the Shagai lands on 50 irrespective of the weight.

Link to repository: [veedata/Robocon2019-MATLAB](https://github.com/veedata/Robocon2019-MATLAB)
