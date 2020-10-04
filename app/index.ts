import clock, { TickEvent } from "clock";
import document from "document";

clock.granularity = "seconds";

const hourHand = document.getElementById("hours") as GroupElement;
const minHand = document.getElementById("mins") as GroupElement;
const secHand = document.getElementById("secs") as GroupElement;

function hoursToAngle(hours: number, minutes: number): number {
  const hourAngle = (360 / 12) * (hours % 12);
  const minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

function minutesToAngle(minutes: number): number {
  return (360 / 60) * minutes;
}

function secondsToAngle(seconds: number): number {
  return (360 / 60) * seconds;
}

function rotateHand(element: GroupElement, angle: number): void {
  element.groupTransform.rotate.angle = angle;
}

function updateClock({ date }: TickEvent): void {
  const hours = date.getHours();
  const mins = date.getMinutes();
  const secs = date.getSeconds();

  rotateHand(hourHand, hoursToAngle(hours, mins));
  rotateHand(minHand, minutesToAngle(mins));
  rotateHand(secHand, secondsToAngle(secs));
}

clock.addEventListener("tick", updateClock);
